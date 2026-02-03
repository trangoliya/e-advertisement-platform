import { Navigate, Routes, Route } from "react-router-dom";
import Login from "../pages/auth/Login.jsx";
import Register from "../pages/auth/Register.jsx";
import Home from "../pages/auth/Home.jsx";
import Admin from "../pages/Admin/AdminPage.jsx";
import Publisher from "../pages/publisher/PublisherPage.jsx";
import User from "../pages/user/UserPage.jsx";
import AuthLayout from "../layouts/AuthLayout.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import RoleRoute from "./RoleRoute.jsx";

function AppRoutes() {
  return (
    <Routes>
      {/* default */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Auth routes */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      {/* Protected routes */}
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin"
        element={
          <RoleRoute allowedRoles={["admin"]}>
            <Admin />
          </RoleRoute>
        }
      />
      <Route
        path="/publisher"
        element={
          <RoleRoute allowedRoles={["publisher"]}>
            <Publisher />
          </RoleRoute>
        }
      />
      <Route
        path="/user"
        element={
          <RoleRoute allowedRoles={["user"]}>
            <User />
          </RoleRoute>
        }
      /> 
    </Routes>
  );
}
export default AppRoutes;
