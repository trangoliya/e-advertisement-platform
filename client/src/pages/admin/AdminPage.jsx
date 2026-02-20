import { useEffect, useState } from "react";
import { getAllUsers, getAllAds } from "../../services/admin.service";

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const usersData = await getAllUsers();
      const adsData = await getAllAds();

      setUsers(usersData.data || usersData);
      setAds(adsData.data || adsData);
    } catch (error) {
      console.error("Admin fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin h-10 w-10 rounded-full border-4 border-red-600 border-t-transparent" />
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <p className="text-sm text-gray-500">Total Users</p>
          <p className="text-3xl font-bold text-gray-800">{users.length}</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <p className="text-sm text-gray-500">Total Ads</p>
          <p className="text-3xl font-bold text-gray-800">{ads.length}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
