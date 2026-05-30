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
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>

        <p className="mt-1 text-gray-500">
          Overview of users, advertisements and platform activity.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">Total Users</p>

          <h2 className="mt-3 text-4xl font-bold">{users.length}</h2>
        </div>

        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">Total Ads</p>

          <h2 className="mt-3 text-4xl font-bold">{ads.length}</h2>
        </div>

        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">Active Ads</p>

          <h2 className="mt-3 text-4xl font-bold text-green-600">
            {ads.filter((ad) => ad.status === "active").length}
          </h2>
        </div>

        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">Paused Ads</p>

          <h2 className="mt-3 text-4xl font-bold text-yellow-600">
            {ads.filter((ad) => ad.status === "paused").length}
          </h2>
        </div>
      </div>

      {/* Overview Sections */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Users */}
        <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
          <div className="border-b px-6 py-4">
            <h3 className="font-semibold">Recent Users</h3>
          </div>

          <div className="divide-y">
            {users.length === 0 && (
              <div className="px-6 py-8 text-center text-gray-500">
                No users found
              </div>
            )}

            {users.slice(0, 5).map((user) => (
              <div
                key={user._id}
                className="flex items-center justify-between px-6 py-4"
              >
                <div>
                  <p className="font-medium text-gray-900">{user.name}</p>

                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>

                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs">
                  {user.roles?.[0] || "User"}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Ads */}
        <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
          <div className="border-b px-6 py-4">
            <h3 className="font-semibold">Recent Ads</h3>
          </div>

          <div className="divide-y">
            {ads.length === 0 && (
              <div className="px-6 py-8 text-center text-gray-500">
                No advertisements found
              </div>
            )}

            {ads.slice(0, 5).map((ad) => (
              <div
                key={ad._id}
                className="flex items-center justify-between px-6 py-4"
              >
                <div>
                  <p className="font-medium text-gray-900">{ad.title}</p>

                  <p className="text-sm text-gray-500">
                    {ad.publisher?.name || "Unknown"}
                  </p>
                </div>

                <span
                  className={`rounded-full px-3 py-1 text-xs ${
                    ad.status === "active"
                      ? "bg-green-100 text-green-700"
                      : ad.status === "paused"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {ad.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
