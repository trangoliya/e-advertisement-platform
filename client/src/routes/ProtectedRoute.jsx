import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  // console.log("ProtectedRoute rendered");
  const isAuthentticated = localStorage.getItem("token");
  // console.log("Token:", isAuthentticated);


  return isAuthentticated ? <Outlet /> : <Navigate to="/login" replace />;
}

export default ProtectedRoute;
