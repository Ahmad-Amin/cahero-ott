<<<<<<< HEAD
import React from "react";
import { Navigate } from "react-router-dom";
import { toast, isActive } from "react-toastify";
=======
// ProtectedRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
>>>>>>> 9e376c241b0e5da10b336f49f60401e305fb0f0b
import { useSelector } from "react-redux";

const UserProtectedRoute = ({ children }) => {
  const user = useSelector((state) => state.auth.user); 

  if (!user) {
    if (!toast.isActive("login-required-toast")) { // Check if a toast with this ID is active
      toast.error("You need to log in to access this page.", {
        toastId: "login-required-toast", // Add a unique ID to the toast
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
    return <Navigate to="/" />; 
  }

  return children; 
};

export default UserProtectedRoute;
