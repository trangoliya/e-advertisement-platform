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

import Publisher from "../pages/publisher/PublisherPage.jsx";
import MyAds from "../pages/publisher/MyAds.jsx";
import CreateAd from "../pages/publisher/CreateAd.jsx";

import AuthLayout from "../layouts/AuthLayout.jsx";
import MainLayout from "../layouts/MainLayout.jsx";

import ProtectedRoute from "./ProtectedRoute.jsx";
import RoleRoute from "./RoleRoute.jsx";

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
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },

  /* Protected routes */
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <MainLayout />,
        children: [
          /* USER */
          {
            element: <RoleRoute allowedRoles={["user"]} />,
            children: [
              {
                path: "/home",
                element: <Home />,
              },
              {
                path: "/ads/:id",
                element: <AdDetails />,
              },
            ],
          },

          /* ADMIN */
          {
            element: <RoleRoute allowedRoles={["admin"]} />,
            children: [
              {
                path: "/admin",
                element: <Admin />,
              },
            ],
          },

          /* PUBLISHER */
          {
            element: <RoleRoute allowedRoles={["publisher"]} />,
            children: [
              {
                path: "/publisher",
                element: <Publisher />,
              },
              {
                path: "/publisher/my-ads",
                element: <MyAds />,
              },
              {
                path: "/publisher/create-ad",
                element: <CreateAd />,
              },
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
