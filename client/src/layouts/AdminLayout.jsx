import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-bgPrimary text-textPrimary flex">

      {/* Sidebar */}
      <aside className="w-64 bg-bgSecondary border-r border-borderColorCustom p-6">
        <h2 className="text-xl font-semibold mb-6 text-accent">
          Admin Panel
        </h2>

        <nav className="space-y-4 text-textSecondary">
          <div className="hover:text-textPrimary cursor-pointer">
            Dashboard
          </div>
          <div className="hover:text-textPrimary cursor-pointer">
            Users
          </div>
          <div className="hover:text-textPrimary cursor-pointer">
            Ads
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <Outlet />
      </main>

    </div>
  );
};

export default AdminLayout;