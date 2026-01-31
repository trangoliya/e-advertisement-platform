import { useNavigate } from "react-router-dom";
import "../../styles/auth.css";
import "../../styles/globle.css";
const Login = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    localStorage.setItem("token", "dummy-token");
    navigate("/dashboard");
  };
  return (
    <div className="auth-container">
      <div className="login-card">
        <h2>Login</h2>

        <form>
          <div className="form-group">
            <label>Email</label>
            <input type="email" placeholder="Enter your email" required />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input type="password" placeholder="Enter your password" required />
          </div>

          <button type="submit" onClick={handleLogin}>
            Login
          </button>
        </form>

        <div className="login-links">
          Don’t have an account?
          <a href="/register">Register</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
