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


// const MainLayout = () => {
//   return (
//     <div className="min-h-screen bg-bgPrimary text-textPrimary">
//       <UserNavbar />
//       <div className="p-6">
//         <Outlet />
//       </div>
//     </div>
//   );
// };