import { NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Sidebar = () => {
  const { user } = useAuth();
  const roles = user?.roles || [];

  const navItem =
    "flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 ease-in-out";

  const activeStyle = "bg-gray-900 text-white font-semibold";
  const inactiveStyle =
    "text-gray-400 hover:bg-gray-800 hover:text-white hover:scale-[1.02]";

  const isPublisher = roles.includes("publisher");
  const isAdmin = roles.includes("admin");
  const isUser = roles.includes("user");

  return (
    <div className="fixed top-0 left-0 w-64 h-screen bg-gray-950 text-white p-6 flex flex-col border-r border-gray-800">
      <h2 className="text-3xl font-bold mb-8">AdPlatform</h2>

      {/* USER SECTION */}
      {isUser && (
        <>
          <p className="text-xs tracking-wider text-gray-500 mb-3">USER</p>

          <div className="space-y-2">
            <NavLink
              to="/home"
              className={({ isActive }) =>
                `${navItem} ${isActive ? activeStyle : inactiveStyle}`
              }
            >
              Watch Ads
            </NavLink>
          </div>
        </>
      )}

      {/* PUBLISHER SECTION */}
      {isPublisher && (
        <>
          <p className="text-xs tracking-wider text-gray-500 mt-8 mb-3">
            PUBLISHER
          </p>
          

          <div className="space-y-2">
            <NavLink
              to="/publisher/dashboard"
              className={({ isActive }) =>
                `${navItem} ${isActive ? activeStyle : inactiveStyle}`
              }
            >
              Dashboard
            </NavLink>

            <NavLink
              to="/publisher/my-ads"
              className={({ isActive }) =>
                `${navItem} ${isActive ? activeStyle : inactiveStyle}`
              }
            >
              My Ads
            </NavLink>

            <NavLink
              to="/publisher/create-ad"
              className={({ isActive }) =>
                `${navItem} ${isActive ? activeStyle : inactiveStyle}`
              }
            >
              Create Ad
            </NavLink>

            <NavLink
              to="/publisher/analytics"
              className={({ isActive }) =>
                `${navItem} ${isActive ? activeStyle : inactiveStyle}`
              }
            >
              Analytics
            </NavLink>

            <NavLink
              to="/publisher/campaigns"
              className={({ isActive }) =>
                `${navItem} ${isActive ? activeStyle : inactiveStyle}`
              }
            >
              Campaigns
            </NavLink>
          </div>
        </>
      )}

      {/* ADMIN SECTION */}
      {isAdmin && (
        <>
          <p className="text-xs tracking-wider text-gray-500 mt-8 mb-3">
            ADMIN
          </p>

          <div className="space-y-2">
            <NavLink
              to="/admin"
              className={({ isActive }) =>
                `${navItem} ${isActive ? activeStyle : inactiveStyle}`
              }
            >
              Dashboard
            </NavLink>

            <NavLink
              to="/admin/users"
              className={({ isActive }) =>
                `${navItem} ${isActive ? activeStyle : inactiveStyle}`
              }
            >
              Users
            </NavLink>

            <NavLink
              to="/admin/ads"
              className={({ isActive }) =>
                `${navItem} ${isActive ? activeStyle : inactiveStyle}`
              }
            >
              Ads
            </NavLink>
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;
