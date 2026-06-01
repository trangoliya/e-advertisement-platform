import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { FiShield } from "react-icons/fi";

const ProtectedRoute = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className="h-16 w-16 animate-spin rounded-full border-4 border-indigo-200 border-t-indigo-600" />

            <div className="absolute inset-0 flex items-center justify-center">
              <FiShield className="text-indigo-600 text-xl" />
            </div>
          </div>

          <div className="text-center">
            <h3 className="font-semibold text-gray-900">Verifying Access</h3>

            <p className="text-sm text-gray-500 mt-1">
              Please wait while we authenticate your account...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
