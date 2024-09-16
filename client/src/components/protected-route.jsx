import React from "react";
import { useUserStore } from "@/store/user";
import { Navigate, Outlet } from "react-router-dom";
export const ProtectedRoute = () => {
  let { isAuthenticated } = useUserStore();
  return isAuthenticated ? <Outlet /> : <Navigate to="/auth" />;
};
