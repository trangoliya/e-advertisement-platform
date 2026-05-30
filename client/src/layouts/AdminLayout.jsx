import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="flex-1 min-h-screen bg-slate-100">
      <main className="p-6 md:p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;