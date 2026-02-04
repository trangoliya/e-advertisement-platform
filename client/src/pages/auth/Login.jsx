import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import "../../styles/auth.css";
import "../../styles/globle.css";

const Login = () => {
  const [role, setRole] = useState("user");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = () => {
    
    login(role); // Example user data on login
    if (role === "admin") navigate("/admin");
    else if (role === "publisher") navigate("/publisher");
    else navigate("/home");
  };
  return (
    <div className="auth-container">
      <div className="login-card">
        <h2>Login</h2>

        <form onSubmit={handleSubmit}>
          {/* <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" required />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" required />
          </div> */}


          {/* <select value={role} onChange={(e) => setRole(e.target.value)} required>
            <option value="admin">Admin</option>
            <option value="publisher">Publisher</option>
            <option value="user">User</option>
          </select> */}

            {/* temporary radio buttons for role selection */}
          <div style={{display:"flex", gap:"10px", marginBottom:"10px"}}>
            <label> 
            <input type="radio" value="user" name="role" checked={role === "user"} onChange={() => setRole("user")} /> User </label>
            <label>
              <input type="radio" value="admin" name="role" checked={role === "admin"} onChange={() => setRole("admin")} /> Admin
            </label>
            <label>
              <input   type="radio" value="publisher" name="role" checked={role === "publisher"} onChange={() => setRole("publisher")} /> Publisher
            </label>
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
