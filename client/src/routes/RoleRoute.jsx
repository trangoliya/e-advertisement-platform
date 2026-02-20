import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RoleRoute = ({ allowedRoles }) => {
  const { user, loading } = useAuth();

  /* Loading state */
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-4 border-blue-600 border-t-transparent" />
      </div>
    );
  }

  /* Not logged in */
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  /* Logged in but wrong role */
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/home" replace />;
  }

  /* Authorized */
  return <Outlet />;
};

export default RoleRoute;
