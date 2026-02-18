import { Navigate, Routes, Route } from "react-router-dom";
import Login from "../pages/auth/Login.jsx";
import Register from "../pages/auth/Register.jsx";
import Home from "../pages/user/Home.jsx";
import Admin from "../pages/admin/AdminPage.jsx";
import Publisher from "../pages/publisher/PublisherPage.jsx";
import MyAds from "../pages/publisher/MyAds.jsx";
import CreateAd from "../pages/publisher/CreateAd.jsx";
import AdDetails from "../pages/user/AdDetails.jsx";
import AuthLayout from "../layouts/AuthLayout.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import RoleRoute from "./RoleRoute.jsx";
import MainLayout from "../layouts/MainLayout.jsx";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Auth routes */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      {/* Protected routes */}
      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          {/* USER */}
          <Route element={<RoleRoute allowedRoles={["user"]} />}>
            <Route path="/home" element={<Home />} />
            <Route path="/ads/:id" element={<AdDetails />} />
          </Route>

          {/* ADMIN */}
          <Route element={<RoleRoute allowedRoles={["admin"]} />}>
            <Route path="/admin" element={<Admin />} />
          </Route>

          {/* PUBLISHER */}
          <Route element={<RoleRoute allowedRoles={["publisher"]} />}>
            <Route path="/publisher" element={<Publisher />} />
            <Route path="/publisher/my-ads" element={<MyAds />} />
            <Route path="/publisher/create-ad" element={<CreateAd />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default AppRoutes;
