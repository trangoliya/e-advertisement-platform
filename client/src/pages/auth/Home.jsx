import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import "../../styles/auth.css";

const Home = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div>
      <h1>Home</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};
export default Home;
