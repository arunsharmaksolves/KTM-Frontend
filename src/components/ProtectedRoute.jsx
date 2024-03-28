import Cookies from "js-cookie";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import SideBar from "./SideBar";

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
  <div className="flex">
  <SideBar/>
   <Outlet /> 
   </div>
   : <Navigate to="/login" />;
  
}

export default ProtectedRoute;
