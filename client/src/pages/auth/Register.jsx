import "../../styles/auth.css";
import "../../styles/globle.css";

const Register = () => {
  return (
   <div className="auth-container">
      <div className="register-card">
        <h2>Create Account</h2>

        <form>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input type="text" id="name" placeholder="Enter your name" required />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Create a password"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirm">Confirm Password</label>
            <input
              type="password"
              id="confirm"
              placeholder="Confirm your password"
              required
            />
          </div>

          <button type="submit">Register</button>
        </form>
        <div className="login-link">
              Already have an account?
              <a href="/login">Login</a>
          </div>
      </div>
   </div>
  );
};
export default Register;
