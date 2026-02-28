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

  /* Loading */
  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin h-10 w-10 rounded-full border-4 border-red-600 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <h1 className="text-3xl font-bold text-gray-800">All Users</h1>

      {users.length === 0 ? (
        <div className="bg-white border border-gray-100 rounded-2xl p-10 text-center text-gray-500">
          No users found
        </div>
      ) : (
        <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
          <table className="w-full border-collapse">
            <thead className="bg-gray-50 border-b">
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
                  className="border-t hover:bg-gray-50 transition duration-200"
                >
                  {/* Name */}
                  <td className="px-6 py-5 font-medium text-gray-800">
                    {user.name}
                  </td>

                  {/* Email */}
                  <td className="px-6 py-5 text-gray-600">{user.email}</td>

                  {/* Role */}

                  <td className="px-6 py-5 text-center">
                    <StatusBadge status={user.role} />
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
      )}
    </div>
  );
};

export default AllUserList;
