import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";

const AdminSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmed = window.confirm("Are you sure you want to logout?");
    if (!confirmed) return;

    setLoggingOut(true);
    setTimeout(() => {
      logout();
      navigate("/login", { replace: true });
    }, 300);
  };

  return (
    <aside
      className={`bg-white border-r border-gray-200 min-h-screen
      transition-all duration-300
      ${collapsed ? "w-20" : "w-64"}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        {!collapsed && (
          <span className="text-lg font-bold text-red-600">Admin Panel</span>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-gray-600 hover:text-gray-900"
        >
          &nbsp;&nbsp;☰
        </button>
      </div>

      {/* Navigation */}
      <nav className="px-3 py-4 space-y-1">
        <NavLink
          to="/admin"
          end
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium
            ${
              isActive
                ? "bg-red-50 text-red-600"
                : "text-gray-700 hover:bg-gray-100"
            }`
          }
        >
          📊 {!collapsed && "Dashboard"}
        </NavLink>

        <NavLink
          to="/admin/users"
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium
            ${
              isActive
                ? "bg-red-50 text-red-600"
                : "text-gray-700 hover:bg-gray-100"
            }`
          }
        >
          👥 {!collapsed && "Users"}
        </NavLink>

        <NavLink
          to="/admin/ads"
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium
            ${
              isActive
                ? "bg-red-50 text-red-600"
                : "text-gray-700 hover:bg-gray-100"
            }`
          }
        >
          📢 {!collapsed && "Ads"}
        </NavLink>

        <NavLink
          to="/admin/settings"
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium
            ${
              isActive
                ? "bg-red-50 text-red-600"
                : "text-gray-700 hover:bg-gray-100"
            }`
          }
        >
          ⚙️ {!collapsed && "Settings"}
        </NavLink>
      </nav>

      {/* Logout */}
      <div className="p-3 border-t">
        <button
          onClick={handleLogout}
          disabled={loggingOut}
          className={`w-full rounded-lg px-3 py-2 text-sm font-medium transition
          ${
            loggingOut
              ? "bg-gray-200 text-gray-500"
              : "bg-red-50 text-red-600 hover:bg-red-100"
          }`}
        >
          {collapsed ? "🚪" : loggingOut ? "Logging out..." : "Logout"}
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
