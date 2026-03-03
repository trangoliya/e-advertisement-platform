import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import ViewerOnboardingModal from "../components/common/ViewerOnboardingModal";

const DashboardLayout = ({ children }) => {
  const { user } = useAuth();

  const shouldShowOnboarding =
    user?.role === "viewer" && !user?.profileCompleted;

  // Only side-effect: lock background scroll
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

  return (
    <>
      {shouldShowOnboarding && <ViewerOnboardingModal />}

      <div className="dashboard-layout">{children}</div>
    </>
  );
};

export default DashboardLayout;
