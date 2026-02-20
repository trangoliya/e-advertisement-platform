import { Outlet } from "react-router-dom";
import PublisherSidebar from "../components/publisher/PublisherSidebar.jsx";

const PublisherLayout = () => {
  return (
    <div className="flex bg-gray-100">
      <PublisherSidebar />
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default PublisherLayout;