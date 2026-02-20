import { useNavigate, Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const confirm = e.target.confirm.value;

    if (password !== confirm) {
      console.log("Passwords do not match");
      return;
    }

    const result = await register({ name, email, password });

    if (result.success) {
      navigate("/login");
    } else {
      console.log(result.message);
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Left side – Advertisement */}
      <div className="hidden lg:flex w-1/2 relative">
        <img
          src="https://images.unsplash.com/photo-1521791136064-7986c2920216"
          alt="Advertising platform"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-blue-900/50 flex items-end p-10">
          <h2 className="text-white text-3xl font-bold leading-snug">
            Start advertising today.
            <br />
            Grow your audience.
          </h2>
        </div>
      </div>

      {/* Right side – Register Form */}
      <div className="flex w-full lg:w-1/2 items-center justify-center px-6">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Create Account
          </h2>
          <p className="text-gray-500 mb-6">
            Join us and start your journey
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
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
                placeholder="Tusharth Rangoliya"
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5
                           focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30
                           outline-none transition"
              />
            </div>

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

            <div>
              <label
                htmlFor="confirm"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirm"
                name="confirm"
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
              Register
            </button>
          </form>

          {/* Login Link */}
          <p className="mt-6 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-600 font-medium hover:underline"
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