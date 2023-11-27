import React from "react";
import { useSelector } from "react-redux";
import { rootUrl } from "../../../service/api.url";
import { getUser } from "../../../store/reducers/user";
import PlaceHolder from "../../../assets/placeholder.JPG";
const UserPanel = () => {
  const user = useSelector(getUser);
  return (
    <div>
      <div className="sidebar-user text-center">
        <div>
          <img
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "100%",
              position: "relative",
              objectFit: "cover",
            }}
            src={user?.image ? `${rootUrl}${user?.image}` : PlaceHolder}
            alt="user image"
          />
        </div>
        <h6 className="mt-3 f-14">{user?.first_name}</h6>
        <p>{user?.emailid}</p>
      </div>
    </div>
  );
};

export default UserPanel;
