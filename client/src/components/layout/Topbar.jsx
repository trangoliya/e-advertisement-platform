import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import { getAlerts, markAlertRead } from "../../services/alert.service";

import { FiBell, FiUser, FiLogOut } from "react-icons/fi";

const Topbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [alerts, setAlerts] = useState([]);
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getAlerts();
        setAlerts(res.data);
      } catch (err) {
        console.error("Alert fetch failed:", err);
      }
    };

    fetchData();

    const interval = setInterval(fetchData, 30000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleClickOutside = () => {
      setOpen(false);
      setProfileOpen(false);
    };

    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const unreadCount = alerts.filter((a) => !a.isRead).length;

  const handleRead = async (id) => {
    try {
      await markAlertRead(id);

      const res = await getAlerts();
      setAlerts(res.data);
    } catch (err) {
      console.error("Failed to mark alert as read:", err);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const avatarUrl =
    user?.avatar || `https://ui-avatars.com/api/?name=${user?.name || "User"}`;

  return (
    <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 shadow-sm">
      {/* Brand */}
      <div>
        <h3 className="text-lg font-bold text-gray-900">AdPlatform</h3>
        <p className="text-xs text-gray-500">Digital Advertising System</p>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-5 relative">
        {/* Notifications */}
        <div className="relative">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setOpen(!open);
              setProfileOpen(false);
            }}
            className="text-xl text-gray-700 hover:text-indigo-600 transition"
          >
            <FiBell />
          </button>

          {unreadCount > 0 && (
            <span className="absolute -top-2 -right-2 min-w-4.5 h-4.5 flex items-center justify-center bg-red-500 text-white text-[10px] font-semibold rounded-full">
              {unreadCount}
            </span>
          )}

          {open && (
            <div className="absolute right-0 mt-3 w-72 bg-white border border-gray-200 rounded-xl shadow-xl p-3 z-50">
              <h4 className="font-semibold text-sm mb-3">Notifications</h4>

              {alerts.length === 0 && (
                <p className="text-sm text-gray-500">No alerts</p>
              )}

              {alerts.map((alert) => (
                <div
                  key={alert._id}
                  onClick={() => handleRead(alert._id)}
                  className={`p-3 mb-2 rounded-lg text-sm cursor-pointer transition ${
                    alert.isRead
                      ? "bg-gray-100"
                      : "bg-yellow-100 hover:bg-yellow-200"
                  }`}
                >
                  {alert.message}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* User Info */}
        <div className="text-right hidden sm:block">
          <p className="text-sm font-semibold text-gray-800">{user?.name}</p>

          <p className="text-xs text-gray-500">{user?.email}</p>
        </div>

        {/* Avatar */}
        <div className="relative">
          <img
            src={avatarUrl}
            alt="avatar"
            className="w-10 h-10 rounded-full object-cover cursor-pointer border-2 border-gray-200 hover:border-indigo-500 hover:scale-105 transition"
            onClick={(e) => {
              e.stopPropagation();
              setProfileOpen(!profileOpen);
              setOpen(false);
            }}
          />

          {profileOpen && (
            <div className="absolute right-0 mt-3 w-48 bg-white border border-gray-200 rounded-xl shadow-xl z-50 overflow-hidden">
              <button
                onClick={() => {
                  navigate("/profile");
                  setProfileOpen(false);
                }}
                className="flex items-center gap-2 w-full px-4 py-3 text-sm hover:bg-gray-100 transition"
              >
                <FiUser />
                Profile
              </button>

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 w-full px-4 py-3 text-sm text-red-500 hover:bg-red-50 transition"
              >
                <FiLogOut />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Topbar;
