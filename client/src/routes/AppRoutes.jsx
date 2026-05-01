import { createBrowserRouter, RouterProvider } from "react-router-dom";

import PublicPage from "../pages/auth/PublicPage.jsx";
import AuthLayout from "../layouts/AuthLayout.jsx";
import Login from "../pages/auth/Login.jsx";
import Register from "../pages/auth/Register.jsx";

import MainLayout from "../layouts/MainLayout.jsx";
import Home from "../pages/user/Home.jsx";
import AdDetails from "../pages/user/AdDetails.jsx";

import DashboardLayout from "../layouts/DashboardLayout.jsx";
import PublisherProfile from "../pages/publisher/PublisherProfile.jsx";
import Admin from "../pages/admin/AdminPage.jsx";
import AllUserList from "../pages/admin/AllUserList.jsx";
import AdminAds from "../pages/admin/AdminAds.jsx";

import PublisherPage from "../pages/publisher/PublisherPage.jsx";
import MyAds from "../pages/publisher/MyAds.jsx";
import CreateAd from "../pages/publisher/CreateAd.jsx";
import Analytics from "../pages/publisher/Analytics.jsx";
import Campaigns from "../pages/publisher/Campaigns.jsx";
import Profile from "../components/layout/Profile.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import RoleRoute from "./RoleRoute.jsx";
import { ROLES } from "../context/roles.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicPage />,
  },
  {
    element: <AuthLayout />,
    children: [
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <RoleRoute allowedRoles={[ROLES.USER]} />,
        children: [
          {
            element: <MainLayout />,
            children: [
              { path: "/home", element: <Home /> },
              { path: "/ads/:id", element: <AdDetails /> },
              { path: "/publisher/:id", element: <PublisherProfile /> },
              { path: "/profile", element: <Profile /> },
            ],
          },
        ],
      },
      {
        element: <RoleRoute allowedRoles={[ROLES.ADMIN]} />,
        children: [
          {
            element: <DashboardLayout />,
            children: [
              { path: "/admin", element: <Admin /> },
              { path: "/admin/users", element: <AllUserList /> },
              { path: "/admin/ads", element: <AdminAds /> },
            ],
          },
        ],
      },
      {
        element: <RoleRoute allowedRoles={[ROLES.PUBLISHER]} />,
        children: [
          {
            element: <DashboardLayout />,
            children: [
              { path: "/publisher", element: <PublisherPage /> },
              { path: "/publisher/dashboard", element: <PublisherPage /> },
              { path: "/publisher/my-ads", element: <MyAds /> },
              { path: "/publisher/create-ad", element: <CreateAd /> },
              { path: "/publisher/analytics", element: <Analytics /> },
              { path: "/publisher/campaigns", element: <Campaigns /> },
            ],
          },
        ],
      },
    ],
  },
]);

const AppRoutes = () => {
  return <RouterProvider router={router} />;
};

export default AppRoutes;
