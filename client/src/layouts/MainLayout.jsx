import { Outlet } from "react-router-dom";
import UserNavbar from "../pages/user/UserNavbar";

const MainLayout = () => {
  return (
    <div>
      <UserNavbar />
      <Outlet />      
    </div>
  );
};

export default MainLayout;
