import React, { useEffect } from "react";
import { useNavigate, redirect } from "react-router-dom";

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/auth/login", { replace: true });
    }
  }, []);

  return children;
};

export default AuthProvider;
