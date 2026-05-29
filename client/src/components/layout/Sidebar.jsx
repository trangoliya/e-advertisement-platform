import { NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

import {
  FiHome,
  FiBarChart2,
  FiPlusCircle,
  FiActivity,
  FiUsers,
  FiShield,
  FiPlayCircle,
  FiLayers,
} from "react-icons/fi";

const Sidebar = () => {
  const { user } = useAuth();
  const roles = user?.roles || [];

  const navItem =
    "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200";

  const activeStyle =
    "bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold shadow-lg";

  const inactiveStyle =
    "text-gray-400 hover:bg-gray-800 hover:text-white";

  const isPublisher = roles.includes("publisher");
  const isAdmin = roles.includes("admin");
  const isUser = roles.includes("user");

  return (
    <aside className="fixed top-0 left-0 w-64 h-screen bg-slate-950 text-white border-r border-slate-800 flex flex-col">

      {/* Logo */}
      <div className="p-6 border-b border-slate-800">
        <h1 className="text-2xl font-bold">
          AdPlatform
        </h1>

        <p className="text-sm text-slate-400 mt-1">
          Digital Advertising System
        </p>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto p-4">

        {/* USER */}
        {isUser && (
          <>
            <p className="text-xs uppercase tracking-widest text-slate-500 mb-3">
              Viewer
            </p>

            <div className="space-y-2">
              <NavLink
                to="/home"
                className={({ isActive }) =>
                  `${navItem} ${
                    isActive ? activeStyle : inactiveStyle
                  }`
                }
              >
                <FiPlayCircle size={18} />
                <span>Watch Ads</span>
              </NavLink>
            </div>
          </>
        )}

        {/* PUBLISHER */}
        {isPublisher && (
          <>
            <p className="text-xs uppercase tracking-widest text-slate-500 mt-8 mb-3">
              Publisher
            </p>

            <div className="space-y-2">

              <NavLink
                to="/publisher/dashboard"
                className={({ isActive }) =>
                  `${navItem} ${
                    isActive ? activeStyle : inactiveStyle
                  }`
                }
              >
                <FiHome size={18} />
                <span>Dashboard</span>
              </NavLink>

              <NavLink
                to="/publisher/my-ads"
                className={({ isActive }) =>
                  `${navItem} ${
                    isActive ? activeStyle : inactiveStyle
                  }`
                }
              >
                <FiLayers size={18} />
                <span>My Ads</span>
              </NavLink>

              <NavLink
                to="/publisher/create-ad"
                className={({ isActive }) =>
                  `${navItem} ${
                    isActive ? activeStyle : inactiveStyle
                  }`
                }
              >
                <FiPlusCircle size={18} />
                <span>Create Ad</span>
              </NavLink>

              <NavLink
                to="/publisher/analytics"
                className={({ isActive }) =>
                  `${navItem} ${
                    isActive ? activeStyle : inactiveStyle
                  }`
                }
              >
                <FiBarChart2 size={18} />
                <span>Analytics</span>
              </NavLink>

              <NavLink
                to="/publisher/campaigns"
                className={({ isActive }) =>
                  `${navItem} ${
                    isActive ? activeStyle : inactiveStyle
                  }`
                }
              >
                <FiActivity size={18} />
                <span>Campaigns</span>
              </NavLink>

            </div>
          </>
        )}

        {/* ADMIN */}
        {isAdmin && (
          <>
            <p className="text-xs uppercase tracking-widest text-slate-500 mt-8 mb-3">
              Administration
            </p>

            <div className="space-y-2">

              <NavLink
                to="/admin"
                className={({ isActive }) =>
                  `${navItem} ${
                    isActive ? activeStyle : inactiveStyle
                  }`
                }
              >
                <FiShield size={18} />
                <span>Dashboard</span>
              </NavLink>

              <NavLink
                to="/admin/users"
                className={({ isActive }) =>
                  `${navItem} ${
                    isActive ? activeStyle : inactiveStyle
                  }`
                }
              >
                <FiUsers size={18} />
                <span>Users</span>
              </NavLink>

              <NavLink
                to="/admin/ads"
                className={({ isActive }) =>
                  `${navItem} ${
                    isActive ? activeStyle : inactiveStyle
                  }`
                }
              >
                <FiLayers size={18} />
                <span>Ads</span>
              </NavLink>

            </div>
          </>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-slate-800">
        <div className="bg-slate-900 rounded-xl p-3">
          <p className="text-sm font-medium">
            {user?.name}
          </p>

          <p className="text-xs text-slate-400 truncate">
            {user?.email}
          </p>
        </div>
      </div>

    </aside>
  );
};

export default Sidebar;