import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
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

  // role check
  const hasAccess = allowedRoles.some((role) => user.roles?.includes(role));

  if (!hasAccess) {
    if (user.roles?.includes(ROLES.ADMIN))
      return <Navigate to="/admin" replace />;
    if (user.roles?.includes(ROLES.PUBLISHER))
      return <Navigate to="/publisher" replace />;
    if (user.roles?.includes(ROLES.USER))
      return <Navigate to="/home" replace />;
  }

  return <Outlet />;
};

export default RoleRoute;
