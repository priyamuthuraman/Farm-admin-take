import React, { Fragment, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Breadcrumb from "../common/breadcrumb";
import data from "../../assets/data/listUser";
import { BiBlock } from "react-icons/bi";
import lodash from "lodash";
import {
  Badge,
  Card,
  CardBody,
  CardHeader,
  Container,
  Modal,
  ModalFooter,
  Button,
} from "reactstrap";
import DataTable from "react-data-table-component";
import { deleteAdminUrl, getAdminUrl, rootUrl } from "../../service/api.url";
import axiosDefault from "../../service/api.config";
import { useQuery } from "react-query";
import { MENUITEMS } from "../../constants/menu";
import { toast } from "react-toastify";
import PlaceHolder from "../../assets/images/placeholder.png";
import useGetRetailUserQuery from "../../react-query/useGetRetailsUserQuery";

const RetailComponent = () => {
  const navigate=useNavigate()
  const [userData, setUserData] = useState([]);
  const [deleteUserId, setDeleteUserId] = useState(null);
  const [openConfirmDialog, setConfirmDialog] = useState(false);
  /**
   *
   */
  const retailUserQuery = useGetRetailUserQuery(setUserData);
  const deleteUser = async () => {
    try {
      let response = await axiosDefault.post(deleteAdminUrl, {
        id: deleteUserId,
      });
      toast.success(response.data?.message);
      // (await userQueryData).refetch();
    } catch (error) {
      toast.error(error.message);
    }
  };
  /**
   * 
   * 

   */
  return (
    <Fragment>
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
              deleteUser();
              setConfirmDialog(false);
            }}
          >
            Delete
          </Button>
          <Button
            type="button"
            color="secondary"
            onClick={() => {
              setConfirmDialog(false);
            }}
          >
            Close
          </Button>
        </ModalFooter>
      </Modal>
      <Breadcrumb title="Retail Customer" parent="Users" />
      <Container fluid={true}>
        <Card>
          <CardHeader>
            <h5>User Details</h5>
          </CardHeader>
          <CardBody>
            <div className="btn-popup pull-right">
              <Link to="/users/createcustomer" className="btn btn-secondary">
                Create User
              </Link>
            </div>
            <div className="clearfix"></div>
            <div
              id="batchDelete"
              className="category-table user-list order-table coupon-list-delete"
            >
              <DataTable
                pagination={true}
                columns={[
                  {
                    name: "Sl.No",
                    selector: (row, index) => {
                      return index + 1;
                    },
                    style: {
                      textAlign: "center",
                    },
                  },
                  {
                    name: "User Name",
                    selector: (row, index) => {
                      return row?.first_name + " " + row?.last_name;
                    },
                    style: {
                      textAlign: "center",
                    },
                  },
                  {
                    name: "Image",
                    selector: (row, index) => {
                      if (!row?.image) {
                        return (
                          <img
                            width={50}
                            style={{
                              borderRadius: "0%",
                            }}
                            src={PlaceHolder}
                          />
                        );
                      }
                      return (
                        <img
                          width={50}
                          style={{
                            borderRadius: "0%",
                          }}
                          src={`${rootUrl}${row?.image}`}
                        />
                      );
                    },
                    style: {
                      textAlign: "center",
                    },
                  },
                  {
                    name: "Email",
                    selector: (row, index) => {
                      return row?.emailid;
                    },
                    style: {
                      textAlign: "center",
                    },
                  },
                  {
                    name: "Mobile",
                    selector: (row, index) => {
                      return row?.mobile_number;
                    },
                    style: {
                      textAlign: "center",
                    },
                  },
                  {
                    name: "state",
                    selector: (row, index) => {
                      return row?.state?.name;
                    },
                    style: {
                      textAlign: "center",
                    },
                  },
                  {
                    name: "city",
                    selector: (row, index) => {
                      return row?.city?.name;
                    },
                    style: {
                      textAlign: "center",
                    },
                  },

                  {
                    name: "Action",
                    selector: (row, index) => {
                      return (
                        <div>
                          <span
                            onClick={() => {
                              setDeleteUserId(row?.id);
                              setConfirmDialog(true);
                            }}
                          >
                            <i
                              className="fa fa-trash"
                              style={{
                                width: 35,
                                fontSize: 20,
                                padding: 11,
                                color: "#e4566e",
                                cursor: "pointer",
                              }}
                            ></i>
                          </span>
                          <span onClick={()=>{
                            navigate("/users/updatecustomer",{state:row})
                          }}>
                            <i
                              className="fa fa-edit"
                              style={{
                                width: 35,
                                fontSize: 20,
                                padding: 11,
                                color: "green",
                                cursor: "pointer",
                              }}
                            ></i>
                          </span>
                        </div>
                      );
                    },
                    style: {
                      textAlign: "center",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    },
                  },
                ]}
                data={userData}
              />
            </div>
          </CardBody>
        </Card>
      </Container>
    </Fragment>
  );
};

export default RetailComponent;
