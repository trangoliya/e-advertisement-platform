import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

import Login from "../pages/auth/Login.jsx";
import Register from "../pages/auth/Register.jsx";

import Home from "../pages/user/Home.jsx";
import AdDetails from "../pages/user/AdDetails.jsx";

import Admin from "../pages/admin/AdminPage.jsx";

import PublisherLayout from "../layouts/PublisherLayout.jsx";
import PublisherPage from "../pages/publisher/PublisherPage.jsx";
import MyAds from "../pages/publisher/MyAds.jsx";
import CreateAd from "../pages/publisher/CreateAd.jsx";

import AuthLayout from "../layouts/AuthLayout.jsx";
import MainLayout from "../layouts/MainLayout.jsx";

import ProtectedRoute from "./ProtectedRoute.jsx";
import RoleRoute from "./RoleRoute.jsx";

import AdminLayout from "../layouts/AdminLayout.jsx";
// import AllUserList from "../pages/admin/AllUserList.jsx";
// import AdminAds from "../pages/admin/AdminAds";
// import AdminSettings from "../pages/admin/AdminSettings";

const router = createBrowserRouter([
  /* Redirect root */
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },

  /* Auth routes */
  {
    element: <AuthLayout />,
    children: [
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
    ],
  },

  /* Protected routes */
  {
    element: <ProtectedRoute />,
    children: [
      /* ================= USER ================= */
      {
        element: <RoleRoute allowedRoles={["user"]} />,
        children: [
          {
            element: <MainLayout />, // ✅ Navbar ONLY for user
            children: [
              { path: "/home", element: <Home /> },
              { path: "/ads/:id", element: <AdDetails /> },
            ],
          },
        ],
      },

      /* ================= ADMIN ================= */
      {
        element: <RoleRoute allowedRoles={["admin"]} />,
        children: [
          {
            element: <AdminLayout />,
            children: [
              { path: "/admin", element: <Admin /> },
              // { path: "/admin/users", element: <AllUserList /> },
              // { path: "/admin/ads", element: <AdminAds /> }, // optional
              // { path: "/admin/settings", element: <AdminSettings /> }, // optional
            ],
          },
        ],
      },

      /* ================= PUBLISHER ================= */
      {
        element: <RoleRoute allowedRoles={["publisher"]} />,
        children: [
          {
            element: <PublisherLayout />, // ✅ Sidebar ONLY
            children: [
              { path: "/publisher", element: <PublisherPage /> },
              { path: "/publisher/my-ads", element: <MyAds /> },
              { path: "/publisher/create-ad", element: <CreateAd /> },
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
