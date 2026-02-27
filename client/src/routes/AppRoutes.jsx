import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

// Unauthorized Person
import PublicPage from "../pages/auth/PublicPage.jsx"; // landing page
import AuthLayout from "../layouts/AuthLayout.jsx";
import Login from "../pages/auth/Login.jsx";
import Register from "../pages/auth/Register.jsx";

// User HomePage and AdDetails for ad viewing 
import MainLayout from "../layouts/MainLayout.jsx";
import Home from "../pages/user/Home.jsx";
import AdDetails from "../pages/user/AdDetails.jsx";

// common Layout of dashboard for admin and publisher 
import DashboardLayout from "../layouts/DashboardLayout.jsx";

// Admin's Pages 
import Admin from "../pages/admin/AdminPage.jsx";
import AllUserList from "../pages/admin/AllUserList.jsx";
import AdminAds from "../pages/admin/AdminAds.jsx";

// Publisher's Pages
import PublisherPage from "../pages/publisher/PublisherPage.jsx";
import MyAds from "../pages/publisher/MyAds.jsx";
import CreateAd from "../pages/publisher/CreateAd.jsx";
import Analytics from "../pages/publisher/Analytics.jsx";
import Campaigns from "../pages/publisher/Campaigns.jsx";

// it's a wrapper for protected routes and role-based access controls
import ProtectedRoute from "./ProtectedRoute.jsx";
import RoleRoute from "./RoleRoute.jsx";

const router = createBrowserRouter([

  /* Redirect root - when user visit our site for information about our services */
  {
    path: "/",
    element: <PublicPage />,
  },

  /* Auth routes - it's use for check authorize role */
  {
    element: <AuthLayout />,
    children: [
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
    ],
  },

  /* Protected routes - protect our routes from unauthorized access */
  {
    element: <ProtectedRoute />,
    children: [
      
      /* ================= USER ================= */
      {
        element: <RoleRoute allowedRoles={["user"]} />, // only user can access these routes
        children: [
          {
            element: <MainLayout />, // layout for user home and ad details
            children: [
              { path: "/home", element: <Home /> },
              { path: "/ads/:id", element: <AdDetails /> },
            ],
          },
        ],
      },

      /* ================= ADMIN ================= */
      {
        element: <RoleRoute allowedRoles={["admin"]} />,  // only admin can access these routes
        children: [
          {
            element: <DashboardLayout />, // common dashboard layout for admin and publisher
            children: [ // admin pages
              { path: "/admin", element: <Admin /> },
              { path: "/admin/users", element: <AllUserList /> },
              { path: "/admin/ads", element: <AdminAds /> },
            ],
          },
        ],
      },

      /* ================= PUBLISHER ================= */
      {
        element: <RoleRoute allowedRoles={["publisher"]} />, // only publisher can access these routes
        children: [
          {
            element: <DashboardLayout />, // common dashboard layout for admin and publisher 
            children: [ // publisher pages
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

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;