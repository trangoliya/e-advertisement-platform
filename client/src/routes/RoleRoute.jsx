import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { ROLES } from "../context/roles";
import { FiLock } from "react-icons/fi";

const RoleRoute = ({ allowedRoles }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className="h-16 w-16 animate-spin rounded-full border-4 border-indigo-200 border-t-indigo-600" />

            <div className="absolute inset-0 flex items-center justify-center">
              <FiLock className="text-indigo-600 text-xl" />
            </div>
          </div>

          <div className="text-center">
            <h3 className="font-semibold text-gray-900">
              Checking Permissions
            </h3>

            <p className="text-sm text-gray-500 mt-1">
              Verifying your access rights...
            </p>
          </div>
        </div>
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
    return <Navigate to="/home" replace />;
  }

  return <Outlet />;
};

export default RoleRoute;
