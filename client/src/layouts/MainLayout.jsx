import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import ViewerOnboardingModal from "../components/common/ViewerOnboardingModal";
import { ROLES } from "../context/roles";
import Topbar from "../components/layout/Topbar";

const MainLayout = () => {
  const { user, loading } = useAuth();

  const shouldShowOnboarding =
    user?.roles?.includes(ROLES.USER) && user?.profileCompleted === false;

  useEffect(() => {
    if (shouldShowOnboarding) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [shouldShowOnboarding]);

  if (loading) return null;

  return (
    <div className="min-h-screen bg-gray-100">
      <Topbar />
      <Outlet />
      {shouldShowOnboarding && <ViewerOnboardingModal />}
    </div>
  );
};

export default MainLayout;