import { useNavigate, Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import "../../styles/auth.css";
import "../../styles/globle.css";


const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    login(); // Example user data on login

    navigate("/home");
  };
  return (
    <div className="auth-container">
      <div className="login-card">
        <h2>Login</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input type="email" placeholder="Enter your email" required />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input type="password" placeholder="Enter your password" required />
          </div>

          <button type="submit">Login</button>
        </form>

        <div className="login-links">
          Don’t have an account?
          <Link to="/register">Register</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
