import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const ProtectedRoute = () => {
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );
  console.log("Protected route check:", { isAuthenticated, user });

  if (!isAuthenticated) {
    console.log("Not authenticated, redirecting to login");
    return <Navigate to="/login" replace />;
  }

  console.log("Authenticated, rendering protected content");
  return <Outlet />;
};

export default ProtectedRoute;
