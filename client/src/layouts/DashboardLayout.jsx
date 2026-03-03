import ViewerOnboardingModal from "../components/common/ViewerOnboardingModal.jsx";
import { useAuth } from "../context/AuthContext";
import Sidebar from "../components/layout/Sidebar.jsx";
import Topbar from "../components/layout/Topbar.jsx";
import { Outlet } from "react-router-dom";
const DashboardLayout = () => {
  const { user, setUser } = useAuth();

  const showModal = user?.role === "viewer" && !user?.profileCompleted;

  const handleComplete = () => {
    setUser({
      ...user,
      profileCompleted: true,
    });
  };

  return (
    <>
      {showModal && (
        <ViewerOnboardingModal
          user={user}
          onClose={() => {}}
          onComplete={handleComplete}
        />
      )}

      <div className="min-h-screen flex bg-bgPrimary text-textPrimary">
        <aside className="hidden md:flex w-64 bg-bgSecondary border-r border-borderColorCustom">
          <Sidebar />
        </aside>

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
