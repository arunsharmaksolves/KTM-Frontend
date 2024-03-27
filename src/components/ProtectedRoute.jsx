import Cookies from "js-cookie";
import React from "react";
import { Navigate, Outlet, ScrollRestoration } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = () => {
  let decodedToken
  try {
    const token = Cookies.get("token");
    decodedToken = jwtDecode(token);
    Cookies.set("id", `${decodedToken.ID}`, { expires: 7 });

  } catch (error) {
    // console.log(error);
    // navigate("/login");
  }

  // Check if decodedToken exists and is valid
  return decodedToken ?
    
   <Outlet /> 
   : <Navigate to="/login" />;
};

export default ProtectedRoute;
