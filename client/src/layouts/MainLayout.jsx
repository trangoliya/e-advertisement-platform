import { Outlet } from "react-router-dom";
import UserNavbar from "../components/user/UserNavbar";

const MainLayout = () => {
  return (
    <div>
      <UserNavbar />
      <Outlet />      
    </div>
  );
};

export default MainLayout;
