import React, { Fragment } from "react";
import { Route, Routes } from "react-router-dom";
import AuthProvider from "../components/auth/AuthProvider";
import Login from "../components/auth/login";
import LayoutRoutes from "./LayoutRoutes";
import { CookiesProvider } from "react-cookie";
const Routers = () => {
  return (
    <Fragment>
       <CookiesProvider>
      <Routes>
        <Route
          exact
          path={`${process.env.PUBLIC_URL}/auth/login`}
          element={<Login />}
        />
       
          <Route path={`/*`} element={<LayoutRoutes />} />
       
      </Routes>
      </CookiesProvider>
    </Fragment>
  );
};

export default Routers;