import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = (props: any) => {
  const token = localStorage.getItem("token");

  return token ? <>{props.children}</> : <Navigate to="/sign-in" />;
};

export default PrivateRoute;
