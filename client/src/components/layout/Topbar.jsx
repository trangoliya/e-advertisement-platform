import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import { getAlerts, markAlertRead } from "../../services/alert.service";

const Topbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [alerts, setAlerts] = useState([]);
  const [open, setOpen] = useState(false);

  const fetchAlerts = async () => {
    try {
      const res = await getAlerts();
      setAlerts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {

  const loadAlerts = async () => {
    try {
      const res = await getAlerts();
      setAlerts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // first load
  loadAlerts();

  // auto refresh every 30 seconds
  const interval = setInterval(loadAlerts, 30000);

  return () => clearInterval(interval);

}, []);

  const unreadCount = alerts.filter(a => !a.isRead).length;

  const handleRead = async (id) => {
    await markAlertRead(id);
    fetchAlerts();
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="h-15 bg-white border-b border-gray-200 flex items-center justify-between px-6">

      {/* Brand */}
      <h3 className="text-lg font-semibold">AdPlatform</h3>

      {/* Right Side */}
      <div className="flex items-center gap-5 relative">

        {/* 🔔 Notification */}
        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="text-xl hover:text-gray-700"
          >
            🔔
          </button>

          {unreadCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
              {unreadCount}
            </span>
          )}

          {/* Dropdown */}
          {open && (
            <div className="absolute right-0 mt-3 w-72 bg-white border border-gray-200 rounded-lg shadow-lg p-3 z-20">

              {alerts.length === 0 && (
                <p className="text-sm text-gray-500">
                  No alerts
                </p>
              )}

              {alerts.map(alert => (
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

        {/* Avatar */}
        <div className="w-9 h-9 rounded-full bg-slate-800"></div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="px-3 py-1 text-sm bg-red-500 text-white rounded-md hover:bg-red-600 transition"
        >
          Logout
        </button>

      </div>
    </div>
  );
};

export default Topbar;