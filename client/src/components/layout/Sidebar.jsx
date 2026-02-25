import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Sidebar = () => {
  const { user } = useAuth(); // assuming you store role inside user
  const role = user?.role;
  const linkStyle = {
    color: "white",
    textDecoration: "none",
    margin: "10px 0",
    fontSize: "19px",
  };
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "255px",
        height: "100vh",
        background: "#1e293b",
        color: "white",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden", //prevent scrolling
      }}
    >
      <h2 style={{ marginBottom: "30px", fontSize: "42px" }}>AdPlatform</h2>

      {role === "publisher" && (
        <>
          <p style={{ fontSize: "12px", opacity: 0.6 }}>PUBLISHER</p>
          <Link to="/publisher/dashboard" style={linkStyle}>
            Dashboard
          </Link>
          <Link to="/publisher/my-ads" style={linkStyle}>
            My Ads
          </Link>
          <Link to="/publisher/create-ad" style={linkStyle}>
            Create Ad
          </Link>
          <Link to="/publisher/analytics" style={linkStyle}>
            Analytics
          </Link>
        </>
      )}

      {role === "admin" && (
        <>
          <p style={{ fontSize: "12px", opacity: 0.6, marginTop: "20px" }}>
            ADMIN
          </p>
          <Link to="/admin/dashboard" style={linkStyle}>
            Dashboard
          </Link>
          <Link to="/admin/users" style={linkStyle}>
            Users
          </Link>
          <Link to="/admin/ads" style={linkStyle}>
            Ads
          </Link>
        </>
      )}
    </div>
  );
};
export default Sidebar;
