import { Navigate, Outlet } from "react-router-dom";
import useRole from "../hooks/useRole.js";
// import useAuth from "../hooks/useAuth.js";

const RoleRoute = ({ allowedRoles }) => {
  const role = useRole();
  // const { isAuthenticated } = useAuth();

  if (!role) {
    return <Navigate to="/login" />;
  }

  console.log("Role: ", role, "Allowed Roles: ", allowedRoles);
  if (!allowedRoles.includes(role)) {
    return <Navigate to="/login" />;
  }
  return <Outlet />;
};

export default RoleRoute;
