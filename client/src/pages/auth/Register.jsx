import { useNavigate, Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const confirm = e.target.confirm.value;

    try {
      if (password !== confirm) {
        setError("Passwords do not match");
        setLoading(false);
        return;
      }

      const result = await register({
        name,
        email,
        password,
      });

      if (result?.success) {
        navigate("/login");
      } else {
        setError(result?.message || "Registration failed");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-linear-to-br from-slate-100 via-white to-indigo-50">
      {/* Left side – Advertisement */}
      <div className="hidden lg:flex w-1/2 relative">
        <img
          src="https://images.unsplash.com/photo-1521791136064-7986c2920216"
          alt="Advertising platform"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-br from-indigo-900/80 to-purple-900/70 flex items-end p-10">
          <div>
            <span className="mb-4 inline-flex rounded-full bg-white/20 px-4 py-2 text-sm text-white backdrop-blur">
              E-Advertisement Platform
            </span>

            <h2 className="mt-4 text-white text-5xl font-bold leading-tight">
              Reach More People.
              <br />
              Grow Faster.
            </h2>

            <p className="mt-5 text-lg text-white/80 max-w-md">
              Create campaigns, track engagement and manage advertisements
              through a modern digital advertising platform.
            </p>
          </div>
        </div>
      </div>

      {/* Right side – Register Form */}
      <div className="flex w-full lg:w-1/2 items-center justify-center px-6">
        <div className="w-full max-w-md bg-white/90 backdrop-blur p-8 rounded-3xl shadow-xl border border-gray-100">
          <div className="mb-8">
            <h2 className="text-4xl font-bold text-gray-900 mb-2">
              Create Account
            </h2>

            <p className="text-gray-500">Start your advertising journey</p>
          </div>

          {error && (
            <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Full Name
              </label>

              <input
                type="text"
                id="name"
                name="name"
                required
                placeholder="Your Full Name"
                className="w-full rounded-xl border border-gray-300 px-4 py-3
          focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30
          outline-none transition"
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email Address
              </label>

              <input
                type="email"
                id="email"
                name="email"
                required
                placeholder="you@example.com"
                className="w-full rounded-xl border border-gray-300 px-4 py-3
          focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30
          outline-none transition"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  required
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 pr-10
            focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30
            outline-none transition"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black"
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirm"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Confirm Password
              </label>

              <div className="relative">
                <input
                  type={showConfirm ? "text" : "password"}
                  id="confirm"
                  name="confirm"
                  required
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 pr-10
            focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30
            outline-none transition"
                />

                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black"
                >
                  {showConfirm ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-linear-to-r from-indigo-600 to-purple-600 py-3 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Creating Account..." : "Register"}
            </button>
          </form>

          {/* Login Link */}
          <p className="mt-6 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-indigo-600 font-medium hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
