import { Navigate } from "react-router";
import { useProfile } from "../hooks/useAuth";

type RouteProps = {
  children: React.ReactNode;
  role: string | string[];
};
export const ProtectedRoute = ({ children, role }: RouteProps) => {
  const { profile, isLoading } = useProfile();
  if (isLoading) {
    return <></>;
  }

  if (!profile) {
    return <Navigate to="/login" replace />;
  }
  const roles = Array.isArray(role) ? role : [role];
  if (!roles.includes(profile.role || "")) {
    return <Navigate to="/unauthorized" replace />;
  }
  return <>{children}</>;
};
