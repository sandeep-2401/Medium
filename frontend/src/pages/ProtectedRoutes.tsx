import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import { useAuth } from "../components/AuthContext";

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }

  return <>{children}</>;
};
