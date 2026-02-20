import { NavLink, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const PublisherSidebar = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen">
      <div className="p-6 text-xl font-bold text-blue-600">
        AdPublisher
      </div>

      <nav className="px-4 space-y-2">
        <NavLink
          to="/publisher"
          end
          className={({ isActive }) =>
            `block rounded-lg px-4 py-2 font-medium ${
              isActive
                ? "bg-blue-50 text-blue-600"
                : "text-gray-700 hover:bg-gray-100"
            }`
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/publisher/my-ads"
          className={({ isActive }) =>
            `block rounded-lg px-4 py-2 font-medium ${
              isActive
                ? "bg-blue-50 text-blue-600"
                : "text-gray-700 hover:bg-gray-100"
            }`
          }
        >
          My Ads
        </NavLink>

        <NavLink
          to="/publisher/create-ad"
          className={({ isActive }) =>
            `block rounded-lg px-4 py-2 font-medium ${
              isActive
                ? "bg-blue-50 text-blue-600"
                : "text-gray-700 hover:bg-gray-100"
            }`
          }
        >
          Create Ad
        </NavLink>
      </nav>

       <div className="p-4 border-t">       
        <button
          onClick={handleLogout}
          className="w-full rounded-lg border border-red-200 px-4 py-2
                     text-red-600 hover:bg-red-50 transition"
        >
          Logout
        </button>
      </div>
    </aside>
  );
};

export default PublisherSidebar;