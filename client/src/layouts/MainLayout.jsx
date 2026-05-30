import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import ViewerOnboardingModal from "../components/common/ViewerOnboardingModal";
import { ROLES } from "../context/roles";
import Topbar from "../components/layout/Topbar";

const MainLayout = () => {
  const { user, loading } = useAuth();

  const shouldShowOnboarding =
    user?.roles?.includes(ROLES.USER) &&
    user?.profileCompleted === false;

  useEffect(() => {
    document.body.style.overflow = shouldShowOnboarding
      ? "hidden"
      : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [shouldShowOnboarding]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100">

      {/* Top Navigation */}
      <Topbar />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto w-full px-4 md:px-6 py-6">
        <Outlet />
      </main>

      {/* Onboarding Modal */}
      {shouldShowOnboarding && (
        <ViewerOnboardingModal />
      )}

    </div>
  );
};

export default MainLayout;