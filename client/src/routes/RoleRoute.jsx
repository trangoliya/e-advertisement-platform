// import { Navigate, Outlet } from "react-router-dom";
// import useRole from "../hooks/useRole.js";

// const RoleRoute = ({ allowedRoles }) => {
//   const role = useRole();

//   if (!role) {
//     return <Navigate to="/login" replace />;
//   }

//   if (!allowedRoles.includes(role)) {
//     return <Navigate to="/login" replace />;
//   }

//   return <Outlet />;
// };

// export default RoleRoute;
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RoleRoute = ({ allowedRoles }) => {
  const { user, loading } = useAuth();

  if (loading) return null;

  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default RoleRoute;