import { useEffect, useState } from "react";
import { getAllUsers } from "../../services/admin.service";
import StatusBadge from "../../components/common/StatusBadge";

const AllUserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await getAllUsers();
      setUsers(data.data || data);
    } catch (error) {
      console.error("Admin users fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent" />
      </div>
    );
  }

  const totalAdmins = users.filter(
    (u) => u.roles?.includes("admin") || u.role === "admin",
  ).length;

  const activeUsers = users.filter(
    (u) => (u.status || "active") === "active",
  ).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Users Management</h1>

        <p className="mt-1 text-gray-500">
          View and manage all registered users.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">Total Users</p>

          <h2 className="mt-3 text-4xl font-bold">{users.length}</h2>
        </div>

        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">Admin Users</p>

          <h2 className="mt-3 text-4xl font-bold text-indigo-600">
            {totalAdmins}
          </h2>
        </div>

        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">Active Users</p>

          <h2 className="mt-3 text-4xl font-bold text-green-600">
            {activeUsers}
          </h2>
        </div>
      </div>

      {/* Table */}
      {users.length === 0 ? (
        <div className="rounded-2xl border bg-white p-10 text-center text-gray-500 shadow-sm">
          No users found
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b bg-gray-50">
                <tr className="text-xs uppercase tracking-wider text-gray-500">
                  <th className="px-6 py-4 text-left">Name</th>

                  <th className="px-6 py-4 text-left">Email</th>

                  <th className="px-6 py-4 text-center">Role</th>

                  <th className="px-6 py-4 text-center">Status</th>
                </tr>
              </thead>

              <tbody>
                {users.map((user) => (
                  <tr
                    key={user._id}
                    className="border-t transition hover:bg-gray-50"
                  >
                    {/* Name */}
                    <td className="px-6 py-5 font-medium text-gray-800">
                      {user.name}
                    </td>

                    {/* Email */}
                    <td className="px-6 py-5 text-gray-600">{user.email}</td>

                    {/* Role */}
                    <td className="px-6 py-5 text-center">
                      <StatusBadge
                        status={user.roles?.[0] || user.role || "user"}
                      />
                    </td>

                    {/* Status */}
                    <td className="px-6 py-5 text-center">
                      <StatusBadge status={user.status || "active"} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllUserList;
