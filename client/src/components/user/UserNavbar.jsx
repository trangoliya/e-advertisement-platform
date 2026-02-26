import { Link } from "react-router-dom";

const UserNavbar = () => {
  return (
    <nav className="w-full bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-gray-900"
        >
          AdPlatform
        </Link>

        {/* Links */}
        <div className="hidden md:flex items-center space-x-8">
          <Link
            to="/ads"
            className="text-gray-600 hover:text-indigo-600 transition-colors"
          >
            Browse Ads
          </Link>

          <Link
            to="/login"
            className="text-gray-600 hover:text-indigo-600 transition-colors"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-all"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile placeholder (you can expand later) */}
        <div className="md:hidden">
          <button className="text-gray-700">
            ☰
          </button>
        </div>

      </div>
    </nav>
  );
};

export default UserNavbar;