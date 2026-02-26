import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"; // adjust if needed

const Topbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();           // clear token / user
    navigate("/login"); // redirect
  };

  return (
    <div
      style={{
        height: "60px",
        background: "#ffffff",
        borderBottom: "1px solid #e5e7eb",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 20px",
      }}
    >
      {/* Left - Brand */}
      <h3 style={{ margin: 0 }}>AdPlatform</h3>

      {/* Right - User Info */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "15px",
        }}
      >
        <span><p>{user?.name}</p><p>{user?.email}</p></span>

        {/* Avatar Circle */}
        <div
          style={{
            width: "35px",
            height: "35px",
            borderRadius: "50%",
            background: "#1e993b",
          }}
        ></div>

        <button onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Topbar;