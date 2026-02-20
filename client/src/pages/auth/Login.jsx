import { useNavigate, Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();

  const email = e.target.email.value;
  const password = e.target.password.value;

  console.log("Submitting login:", email, password);

  try {
    const result = await login({ email, password });
    console.log("Login result:", result);

    if (!result?.success) {
      console.error("Login failed:", result?.message);
      return;
    }

    const storedUser = JSON.parse(localStorage.getItem("user"));
    console.log("Stored user:", storedUser);

    if (!storedUser?.role) {
      console.error("User role missing");
      return;
    }

    if (storedUser.role === "publisher") {
      navigate("/publisher");
    } else if (storedUser.role === "admin") {
      navigate("/admin");
    } else {
      navigate("/home");
    }
  } catch (err) {
    console.error("Login error:", err);
  }
};  
  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   const email = e.target.email.value;
  //   const password = e.target.password.value;

  //   const result = await login({ email, password });

  //   if (result.success) {
  //     const storedUser = JSON.parse(localStorage.getItem("user"));

  //     if (storedUser.role === "publisher") {
  //       navigate("/publisher");
  //     } else if (storedUser.role === "admin") {
  //       navigate("/admin");
  //     } else {
  //       navigate("/home");
  //     }
  //   } else {
  //     console.log(result.message);
  //   }
  // };

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Left side – Login Form */}
      <div className="flex w-full lg:w-1/2 items-center justify-center px-6">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Welcome Back
          </h2>
          <p className="text-gray-500 mb-6">
            Login to your account
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                placeholder="you@example.com"
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5
                           focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30
                           outline-none transition"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                required
                placeholder="••••••••"
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5
                           focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30
                           outline-none transition"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-blue-600 py-2.5
                         text-white font-semibold hover:bg-blue-700
                         transition"
            >
              Login
            </button>
          </form>

          {/* Register Link */}
          <p className="mt-6 text-center text-sm text-gray-500">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="text-blue-600 font-medium hover:underline"
            >
              Register
            </Link>
          </p>
        </div>
      </div>

      {/* Right side – Advertisement */}
      <div className="hidden lg:flex w-1/2 relative">
        <img
          src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d"
          alt="Advertising platform"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-blue-900/50 flex items-end p-10">
          <h2 className="text-white text-3xl font-bold leading-snug">
            Promote smarter.
            <br />
            Grow your business faster.
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Login;