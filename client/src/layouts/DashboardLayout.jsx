import { Outlet } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";
import Topbar from "../components/layout/Topbar";

const DashboardLayout = () => {
  return (
    <div className="bg-gray-100 min-h-screen">

      {/* Sidebar */}
      <Sidebar />

      {/* Right Content */}
      <div className="ml-64 flex flex-col min-h-screen">

        {/* Topbar */}
        <Topbar />

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-x-auto overflow-y-auto">
          <Outlet />
        </main>

      </div>

    </div>
  );
};

export default DashboardLayout;