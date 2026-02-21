import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import PPAvatar from "../../assets/PP_Avatar.png"
const UserNavbar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          
          {/* Logo */}
          <Link
            to="/home"
            className="text-xl font-bold text-blue-600"
          >
            Ad-vision
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              to="/home"
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              Home
            </Link>

            <Link
              to="/explore"
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              Explore
            </Link>

            <Link
              to="/saved"
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              Saved
            </Link>

            {/* User Avatar */}
            <Link to="/profile">
              <img
                src={PPAvatar}
                alt="User"
                className="w-8 h-8 rounded-full object-cover border"
              />
            </Link>

            <button
              onClick={handleLogout}
              className="text-sm text-red-500 hover:underline"
            >
              Logout
            </button>
          </div>

          {/* Mobile Menu (Icons) */}
          <div className="flex md:hidden items-center gap-4">
            <Link to="/home">🏠</Link>
            <Link to="/explore">🔍</Link>
            <Link to="/saved">❤️</Link>
            <Link to="/profile">
              <img
                src={PPAvatar}
                alt="User"
                className="w-7 h-7 rounded-full"
              />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default UserNavbar;