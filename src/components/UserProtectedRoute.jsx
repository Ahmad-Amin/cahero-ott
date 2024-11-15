<<<<<<< Updated upstream
import React from "react";
import { Navigate } from "react-router-dom";
import { toast, isActive } from "react-toastify";
=======
// ProtectedRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
>>>>>>> Stashed changes
import { useSelector } from "react-redux";

const UserProtectedRoute = ({ children }) => {
  const user = useSelector((state) => state.auth.user); 

  if (!user) {
<<<<<<< Updated upstream
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
=======
    toast.error("Please login first!");
>>>>>>> Stashed changes
    return <Navigate to="/" />; 
  }

  return children; 
};

export default UserProtectedRoute;
