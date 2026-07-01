import { Navigate } from "react-router";

type RouteProps = {
  children: React.ReactNode;
  role: string;
};
export const ProtectedRoute = ({ children, role }: RouteProps) => {
  const userRole = localStorage.getItem("role");
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  if (userRole !== role) {
    return <Navigate to="/unauthorized" replace />;
  }
  return <>{children}</>;
};
