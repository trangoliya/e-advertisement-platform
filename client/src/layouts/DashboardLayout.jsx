import Sidebar from "../components/layout/Sidebar.jsx";
import Topbar from "../components/layout/Topbar.jsx";
import { Outlet } from "react-router-dom";
import ViewerOnboardingModal from "../components/common/ViewerOnboardingModal";
import { useAuth } from "../context/AuthContext";

const DashboardLayout = () => {
  const { user, setUser } = useAuth();

  const showModal = user?.role === "viewer" && !user?.profileCompleted;

  const handleComplete = () => {
    const updatedUser = {
      ...user,
      profileCompleted: true,
    };

    setUser(updatedUser);
    // Update localStorage as well
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  return (
    <>
      {/* Onboarding Modal */}
      {showModal && (
        <ViewerOnboardingModal
          user={user}
          onClose={() => {}}
          onComplete={handleComplete}
        />
      )}

      <div className="min-h-screen flex bg-bgPrimary text-textPrimary">
        {/* Sidebar */}
        <aside className="hidden md:flex w-64 bg-bgSecondary border-r border-borderColorCustom">
          <Sidebar />
        </aside>

        {/* Main */}
        <div className="flex flex-col flex-1">
          <header className="sticky top-0 z-40 bg-bgSecondary border-b border-borderColorCustom">
            <Topbar />
          </header>

          <main className="flex-1 p-6 overflow-y-auto bg-bgPrimary">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
