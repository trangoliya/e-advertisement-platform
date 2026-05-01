import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Auth
import PublicPage from "../pages/auth/PublicPage.jsx";
import AuthLayout from "../layouts/AuthLayout.jsx";
import Login from "../pages/auth/Login.jsx";
import Register from "../pages/auth/Register.jsx";

// User (Common + User)
import MainLayout from "../layouts/MainLayout.jsx";
import Home from "../pages/user/Home.jsx";
import AdDetails from "../pages/user/AdDetails.jsx";
import PublisherProfile from "../pages/publisher/PublisherProfile.jsx";
import Profile from "../components/layout/Profile.jsx";

// Admin
import DashboardLayout from "../layouts/DashboardLayout.jsx";
import Admin from "../pages/admin/AdminPage.jsx";
import AllUserList from "../pages/admin/AllUserList.jsx";
import AdminAds from "../pages/admin/AdminAds.jsx";

// Publisher
import PublisherPage from "../pages/publisher/PublisherPage.jsx";
import MyAds from "../pages/publisher/MyAds.jsx";
import CreateAd from "../pages/publisher/CreateAd.jsx";
import Analytics from "../pages/publisher/Analytics.jsx";
import Campaigns from "../pages/publisher/Campaigns.jsx";

// Routes
import ProtectedRoute from "./ProtectedRoute.jsx";
import RoleRoute from "./RoleRoute.jsx";
import { ROLES } from "../context/roles.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicPage />,
  },

  // Auth Routes
  {
    element: <AuthLayout />,
    children: [
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
    ],
  },

  // Protected Routes
  {
    element: <ProtectedRoute />,
    children: [

      // COMMON ROUTES (ALL LOGGED-IN USERS)
      {
        element: <MainLayout />,
        children: [
          { path: "/profile", element: <Profile /> },
        ],
      },

      // USER ROUTES
      {
        element: <RoleRoute allowedRoles={[ROLES.USER]} />,
        children: [
          {
            element: <MainLayout />,
            children: [
              { path: "/home", element: <Home /> },
              { path: "/ads/:id", element: <AdDetails /> },
              { path: "/publisher/:id", element: <PublisherProfile /> },
            ],
          },
        ],
      },

      // ADMIN ROUTES
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

      // PUBLISHER ROUTES
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