import { useNavigate, Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import "../../styles/auth.css";
import "../../styles/global.css";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    console.log("Email:", email);
    console.log("Password:", password);
    const result = await login({
      email,
      password,
    });
    if (result.success) {
      const storedUser = JSON.parse(localStorage.getItem("user"));

      if (storedUser.role === "publisher") {
        navigate("/publisher");
      } else if (storedUser.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/home");
      }
    } else {
      console.log(result.message);
    }
  };
  return (
    <div className="auth-container">
      <div className="login-card">
        <h2>Login</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email:</label>
            <input type="email" id="email" name="email" required />
          </div>

          <div className="form-group">
            <label>Password:</label>
            <input type="password" id="password" name="password" required />
          </div>

          {/* <select value={role} onChange={(e) => setRole(e.target.value)} required>
            <option value="admin">Admin</option>
            <option value="publisher">Publisher</option>
            <option value="user">User</option>
          </select> */}

          {/* temporary radio buttons for role selection */}
          {/* <div style={{display:"flex", gap:"10px", marginBottom:"10px"}}>
            <label> 
            <input type="radio" value="user" name="role" checked={role === "user"} onChange={() => setRole("user")} /> User </label>
            <label>
              <input type="radio" value="admin" name="role" checked={role === "admin"} onChange={() => setRole("admin")} /> Admin
            </label>
            <label>
              <input   type="radio" value="publisher" name="role" checked={role === "publisher"} onChange={() => setRole("publisher")} /> Publisher
            </label>
          </div> */}

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
