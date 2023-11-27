import React, { Fragment, useEffect, useState } from "react";
import UserPanel from "./user-panel";
import { Link, useNavigate } from "react-router-dom";
import { MENUITEMS } from "../../../constants/menu";
import { LogOut } from "react-feather";
import { useDispatch } from "react-redux";
import logo from "../../../assets/images/dashboard/logo.png";
import { rootUrl, getDefaultUrl } from "../../../service/api.url";
import axiosDefault from "../../../service/api.config";
import { useQuery } from "react-query";
import { Modal, ModalBody, ModalFooter, Button, ModalHeader } from "reactstrap";
import { fetchUserThunk, updateUserInfo } from "../../../store/reducers/user";

const useMenuDefaultQuery = (setMainMenu, dispatch) => {
  return useQuery({
    queryKey: "defaultMenu",
    queryFn: async (_) => {
        let response = await axiosDefault.post(
          getDefaultUrl,
          {},
          {
            headers: {
              authorization: localStorage.getItem("token"),
            },
          }
        );

        return response;

    },
    refetchOnMount: true,
    enabled: true,
    retryOnMount: true,
    retry: true,
    onSuccess: (data) => {
      const permission =
        data.data?.message?.menu_privileges_ids.split(",") ?? [];
      setMainMenu(permission);
    },
  });
};

const Sidebar = () => {
  const dispatch = useDispatch();

  const [mainmenu, setMainMenu] = useState(MENUITEMS);
  const [isChange, setIsChange] = useState(false);
  const [userMenu, setUserMenu] = useState([]);

  const [openConfirmDialog, setConfirmDialog] = useState(false);

  const { isLoading } = useMenuDefaultQuery(setUserMenu, dispatch);

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchUserThunk());
  }, []);

  useEffect(() => {
    const currentUrl = window.location.pathname;
    mainmenu?.map((items) => {
      mainMenu.filter((Items) => {
        if (Items.path === currentUrl) setNavActive(Items);
        if (!Items.children) return false;
        Items.children.filter((subItems) => {
          if (subItems.path === currentUrl) setNavActive(subItems);
          if (!subItems.children) return false;
          subItems.children.filter((subSubItems) => {
            if (subSubItems.path === currentUrl) {
              setNavActive(subSubItems);
              return true;
            } else {
              return false;
            }
          });
          return subItems;
        });
        return Items;
      });
      return items;
    });
    return () => {
      setMainMenu(MENUITEMS);
    };
  }, [isChange]);

  const Logout = () => {
    localStorage.removeItem("token");
    navigate("/auth/login");
  };

  const setNavActive = (item) => {
    setIsChange(!isChange);
    MENUITEMS?.filter((menuItem) => {
      if (menuItem !== item) menuItem.active = false;
      if (menuItem.children && menuItem.children.includes(item))
        menuItem.active = true;
      if (menuItem.children) {
        menuItem.children.filter((submenuItems) => {
          if (submenuItems !== item) {
            submenuItems.active = false;
          }
          if (submenuItems.children) {
            submenuItems.children?.map(
              (childItem) => (childItem.active = false)
            );
            if (submenuItems.children.includes(item)) {
              submenuItems.active = true;
              menuItem.active = true;
            }
          }
          return false;
        });
      }
      return false;
    });
    item.active = !item.active;
    setMainMenu(MENUITEMS);
  };

  const mainMenu = mainmenu?.map((menuItem, i) => (
    <li className={`${menuItem.active ? "active" : ""}`} key={menuItem.id}>
      {menuItem.sidebartitle ? (
        <div className="sidebar-title">{menuItem.sidebartitle}</div>
      ) : (
        ""
      )}
      {menuItem.type === "sub" ? (
        <a
          className="sidebar-header "
          href="#"
          onClick={(event) => {
            event.preventDefault();
            return setNavActive(menuItem);
          }}
        >
          <menuItem.icon />
          <span>{menuItem.title}</span>
          <i className="fa fa-angle-right pull-right"></i>
        </a>
      ) : (
        ""
      )}
      {menuItem.type === "link" ? (
        <Link
          to={`${process.env.PUBLIC_URL}${menuItem.path}`}
          className={`sidebar-header ${menuItem.active ? "active" : ""}`}
          onClick={() => setNavActive(menuItem)}
        >
          <menuItem.icon />
          <span>{menuItem.title}</span>
          {menuItem.children ? (
            <i className="fa fa-angle-right pull-right"></i>
          ) : (
            ""
          )}
        </Link>
      ) : (
        ""
      )}
      {menuItem.children ? (
        <ul
          className={`sidebar-submenu ${menuItem.active ? "menu-open" : ""}`}
          style={
            menuItem.active
              ? { opacity: 1, transition: "opacity 500ms ease-in" }
              : {}
          }
        >
          {menuItem.children?.map((childrenItem, index) => (
            <li
              key={index}
              className={
                childrenItem.children
                  ? childrenItem.active
                    ? "active"
                    : ""
                  : ""
              }
            >
              {childrenItem.type === "sub" ? (
                <a
                  href=""
                  onClick={(event) => {
                    event.preventDefault();
                    return setNavActive(childrenItem);
                  }}
                >
                  <i className="fa fa-circle"></i>
                  {childrenItem.title}{" "}
                  <i className="fa fa-angle-right pull-right"></i>
                </a>
              ) : (
                ""
              )}

              {childrenItem.type === "link" ? (
                <Link
                  to={`${process.env.PUBLIC_URL}${childrenItem.path}`}
                  className={childrenItem.active ? "active" : ""}
                  onClick={() => setNavActive(childrenItem)}
                >
                  <i className="fa fa-circle"></i>
                  {childrenItem.title}{" "}
                </Link>
              ) : (
                ""
              )}
              {childrenItem.children ? (
                <ul
                  className={`sidebar-submenu ${
                    childrenItem.active ? "menu-open" : "active"
                  }`}
                >
                  {childrenItem.children?.map((childrenSubItem, key) => (
                    <li
                      className={childrenSubItem.active ? "active" : ""}
                      key={key}
                    >
                      {childrenSubItem.type === "link" ? (
                        <Link
                          to={`${process.env.PUBLIC_URL}${childrenSubItem.path}`}
                          className={childrenSubItem.active ? "active" : ""}
                          onClick={() => setNavActive(childrenSubItem)}
                        >
                          <i className="fa fa-circle"></i>
                          {childrenSubItem.title}
                        </Link>
                      ) : (
                        ""
                      )}
                    </li>
                  ))}
                </ul>
              ) : (
                ""
              )}
            </li>
          ))}
        </ul>
      ) : (
        ""
      )}
    </li>
  ));

  return (
    <Fragment>
      <div className="page-sidebar">
        <div className="main-header-left d-none d-lg-block">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Link to={`${process.env.PUBLIC_URL}/dashboard`}>
              <img
                className="blur-up lazyloaded"
                src={logo}
                alt=""
                width={60}
              />
            </Link>
          </div>
        </div>
        <div className="sidebar custom-scrollbar">
          <UserPanel />
          {!isLoading && (
            <ul className="sidebar-menu">
              {mainMenu}
              <li
                onClick={(e) => {
                  e.preventDefault();
                  setConfirmDialog(true);
                }}
                style={{
                  cursor: "pointer",
                }}
              >
                <a class="sidebar-header">
                  <LogOut />
                  <span>Log Out</span>
                </a>
              </li>
            </ul>
          )}
        </div>
      </div>
      <Modal
        isOpen={openConfirmDialog}
        toggle={() => {
          setConfirmDialog(!openConfirmDialog);
        }}
      >
        <ModalFooter>
          <Button
            type="button"
            color="primary"
            onClick={() => {
              Logout();
              setConfirmDialog(false);
            }}
          >
            Log out
          </Button>
          <Button
            type="button"
            color="secondary"
            onClick={() => {
              setConfirmDialog(false);
            }}
          >
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </Fragment>
  );
};

export default Sidebar;
