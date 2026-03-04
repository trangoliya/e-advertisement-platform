import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ROLES } from "../context/roles";

const RoleRoute = ({ allowedRoles }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    if (user.role === ROLES.ADMIN) return <Navigate to="/admin" replace />;
    if (user.role === ROLES.PUBLISHER) return <Navigate to="/publisher" replace />;
    if (user.role === ROLES.USER) return <Navigate to="/home" replace />;
  }

  return <Outlet />;
};

export default RoleRoute;