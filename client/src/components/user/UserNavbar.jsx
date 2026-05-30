import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";

const UserNavbar = () => {
  return (
    <nav className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg bg-linear-to-r from-indigo-600 to-purple-600 flex items-center justify-center text-white font-bold">
            A
          </div>

          <div>
            <h1 className="text-lg font-bold text-gray-900">AdPlatform</h1>
            <p className="text-[10px] text-gray-500 leading-none">
              Digital Advertising
            </p>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            to="/ads"
            className="text-gray-600 hover:text-indigo-600 font-medium transition"
          >
            Browse Ads
          </Link>

          <Link
            to="/login"
            className="text-gray-600 hover:text-indigo-600 font-medium transition"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-linear-to-r from-indigo-600 to-purple-600 text-white font-medium shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all"
          >
            Get Started
            <FiArrowRight />
          </Link>
        </div>

        {/* Mobile */}
        <div className="md:hidden">
          <button className="text-2xl text-gray-700">☰</button>
        </div>
      </div>
    </nav>
  );
};

export default UserNavbar;
