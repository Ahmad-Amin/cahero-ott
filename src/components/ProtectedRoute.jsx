import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

const ProtectedRoute = ({ children }) => {
  const { user, token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user || !token) {
      toast.error("You need to log in to access this page.", {
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
  }, [user, token]);

  // If no user or token, redirect to the home page
  if (!user || !token) {
    return <Navigate to="/" replace />;
  }

  // Otherwise, render the children (the protected page)
  return children;
};

export default ProtectedRoute;
