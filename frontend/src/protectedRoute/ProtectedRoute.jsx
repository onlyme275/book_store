import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children, role }) => {
  const { user } = useSelector((state) => state.auth);

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (role && user.role !== role) {
    // redirect if role doesn't match
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default ProtectedRoute;