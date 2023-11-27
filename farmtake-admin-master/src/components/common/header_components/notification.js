import React, { Fragment } from "react";
import { ShoppingBag, Download, AlertCircle } from "react-feather";
import { Media } from "reactstrap";
import useNotificationQuery from "../../../react-query/useGetAllNotification";
import { useNavigate } from "react-router-dom";
import axiosDefault from "../../../service/api.config";
import { updateNotifcationUrl } from "../../../service/api.url";
const Notification = () => {
  let { data } = useNotificationQuery();
  const navigate = useNavigate();

  const updateNoficationStatus = async (id) =>
    await axiosDefault.post(updateNotifcationUrl, { id });
  return (
    <Fragment>
      <ul className="notification-dropdown onhover-show-div p-0">
        <li>
          Notification{" "}
          <span className="badge rounded-pill badge-primary pull-right">
            {data?.count}
          </span>
        </li>
        <div
          style={{
            maxHeight: "60vh",
            overflowY: "scroll",
            overflowX: "hidden",
          }}
        >
          {data?.rows?.map((value) => {
            return (
              <li
                key={value?.id}
                onClick={() => {
                  updateNoficationStatus(value?.id);
                  navigate("/sales/orders");
                }}
              >
                <Media>
                  <Media body>
                    <h6 className="mt-0">
                      <span>
                        <ShoppingBag />
                      </span>
                      {value?.title}
                    </h6>
                    <p className="mb-0">{value.metadata}</p>
                  </Media>
                </Media>
              </li>
            );
          })}
        </div>
        {/* <li className="txt-dark">
          <a href="">All</a> notification
        </li> */}
      </ul>
    </Fragment>
  );
};

export default Notification;
