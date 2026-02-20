import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const ProtectedRoute = () => {
  const { user, loading } = useAuth();

  /* Loading state */
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-4 border-blue-600 border-t-transparent" />
      </div>
    );
  }

  /* Not authenticated */
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  /* Authenticated */
  return <Outlet />;
};

export default ProtectedRoute;
