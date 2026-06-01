import { useNavigate, Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const result = await login({ email, password });

      if (!result?.success) {
        setError("Login failed");
        return;
      }

      const storedUser = JSON.parse(localStorage.getItem("user"));

      if (!storedUser?.roles?.length) {
        setError("User role missing");
        return;
      }

      if (storedUser.roles.includes("admin")) {
        navigate("/admin");
      } else if (storedUser.roles.includes("publisher")) {
        navigate("/publisher");
      } else {
        navigate("/home");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-linear-to-br from-slate-100 via-white to-indigo-50">
      {/* Left Side */}
      <div className="flex w-full lg:w-1/2 items-center justify-center px-6 py-10">
        <div className="w-full max-w-md bg-white/90 backdrop-blur p-8 rounded-3xl shadow-xl border border-gray-100">
          <div className="mb-8">
            <h2 className="text-4xl font-bold text-gray-900 mb-2">
              Welcome Back 👋
            </h2>

            <p className="text-gray-500">Sign in to access your dashboard</p>
          </div>

          {error && (
            <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email Address
              </label>

              <input
                type="email"
                id="email"
                name="email"
                required
                placeholder="you@example.com"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
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
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 pr-12 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-indigo-600"
                >
                  {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-linear-to-r from-indigo-600 to-purple-600 py-3 text-white font-semibold shadow-lg hover:shadow-xl transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Signing In..." : "Login"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-500">
            Don&apos;t have an account?{" "}
            <Link
              to="/register"
              className="font-semibold text-indigo-600 hover:underline"
            >
              Register
            </Link>
          </p>
        </div>
      </div>

      {/* Right Side */}
      <div className="hidden lg:flex w-1/2 relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d"
          alt="Advertising platform"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-linear-to-br from-indigo-900/80 to-purple-900/70" />

        <div className="relative z-10 flex flex-col justify-end p-14 text-white">
          <span className="mb-4 inline-flex w-fit rounded-full bg-white/20 px-4 py-2 text-sm backdrop-blur">
            E-Advertisement Platform
          </span>

          <h2 className="text-5xl font-bold leading-tight">
            Promote Smarter.
            <br />
            Grow Faster.
          </h2>

          <p className="mt-5 max-w-md text-lg text-white/80">
            Create campaigns, monitor analytics and reach the right audience
            through a modern advertising platform.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
