import useAuth from "../hooks/useAuth";
const Navbar = () => {
  const { logout } = useAuth();

  return (
    <div>
    <nav className="navbar" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 20px" }}>
      <h1>Ads Website</h1>
      <button onClick={logout} style={{ width: "300px" }}>
        Logout
      </button>

    </nav>
    <hr />
    </div>
  );
};
export default Navbar;
