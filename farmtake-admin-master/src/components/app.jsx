import React, { useState, useEffect } from "react";
import Sidebar from "./common/sidebar_components/sidebar";
import RightSidebar from "./common/right-sidebar";
import Footer from "./common/footer";
import Header from "./common/header_components/header";
import { Outlet, Navigate } from "react-router-dom";

const App = (props) => {
  const initialState = {
    ltr: true,
    divName: "RTL",
  };

  const [side, setSide] = useState(initialState);

  const auth = localStorage.getItem("token");

  if (!auth) return <Navigate to={"/auth/login"} />;

  return (
    <div>
      <div className="page-wrapper">
        <Header />
        <div className="page-body-wrapper">
          <Sidebar />
          <div className="page-body">
            <Outlet />
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};
export default App;
