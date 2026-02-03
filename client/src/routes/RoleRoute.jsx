import { Navigate } from "react-router-dom";
import useRole from "../hooks/useRole.js";
import useAuth from "../hooks/useAuth.js";

const RoleRoute = ({ allowedRoles, children }) => {
  const role = useRole();
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default RoleRoute;
