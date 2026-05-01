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

  // Load alerts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getAlerts();
        setAlerts(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 30000);

    return () => clearInterval(interval);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = () => {
      setOpen(false);
      setProfileOpen(false);
    };

    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  const unreadCount = alerts.filter((a) => !a.isRead).length;

  const handleRead = async (id) => {
    await markAlertRead(id);
    const res = await getAlerts();
    setAlerts(res.data);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const avatarUrl =
    user?.avatar || `https://ui-avatars.com/api/?name=${user?.name || "User"}`;

  return (
    <div className="h-15 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      
      {/* Brand */}
      <h3 className="text-lg font-semibold">AdPlatform</h3>

      {/* Right */}
      <div className="flex items-center gap-5 relative">

        {/* Notification */}
        <div className="relative">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setOpen(!open);
              setProfileOpen(false);
            }}
            className="text-xl hover:text-gray-700"
          >
            <FiBell />
          </button>

          {unreadCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
              {unreadCount}
            </span>
          )}

          {open && (
            <div className="absolute right-0 mt-3 w-72 bg-white border border-gray-200 rounded-lg shadow-lg p-3 z-20">
              
              {alerts.length === 0 && (
                <p className="text-sm text-gray-500">No alerts</p>
              )}

              {alerts.map((alert) => (
                <div
                  key={alert._id}
                  onClick={() => handleRead(alert._id)}
                  className={`p-2 mb-2 rounded-md text-sm cursor-pointer transition ${
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
        <div className="text-right">
          <p className="text-sm font-medium">{user?.name}</p>
          <p className="text-xs text-gray-500">{user?.email}</p>
        </div>

        {/* Avatar Dropdown */}
        <div className="relative">
          <img
            src={avatarUrl}
            alt="avatar"
            className="w-9 h-9 rounded-full object-cover cursor-pointer border"
            onClick={(e) => {
              e.stopPropagation();
              setProfileOpen(!profileOpen);
              setOpen(false);
            }}
          />

          {profileOpen && (
            <div className="absolute right-0 mt-3 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-20">

              <button
                onClick={() => {
                  navigate("/profile");
                  setProfileOpen(false);
                }}
                className="flex items-center gap-2 w-full px-4 py-2 text-sm hover:bg-gray-100"
              >
                <FiUser /> Profile
              </button>

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-500 hover:bg-red-50"
              >
                <FiLogOut /> Logout
              </button>

            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Topbar;