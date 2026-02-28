import { useEffect, useState } from "react";
import { getAllAds, updateAdStatus } from "../../services/admin.service";
import StatusBadge from "../../components/common/StatusBadge";
const AdminAds = () => {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  const fetchAds = async () => {
    try {
      setLoading(true);
      const data = await getAllAds();
      setAds(data.data || data);
    } catch (error) {
      console.error("Admin ads fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAds();
  }, []);

  /** Determine next status */
  const getNextStatus = (current) => {
    if (current === "draft") return "active";
    if (current === "active") return "paused";
    if (current === "paused") return "active";
    return current;
  };

  const handleStatusChange = async (ad) => {
    const nextStatus = getNextStatus(ad.status);
    if (nextStatus === ad.status) return;

    try {
      setUpdatingId(ad._id);
      await updateAdStatus(ad._id, nextStatus); // 🔑 API call
      await fetchAds(); // 🔄 refresh list
    } catch (error) {
      console.error("Error updating ad status:", error);
    } finally {
      setUpdatingId(null);
    }
  };

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
      <h1 className="text-3xl font-bold text-gray-800">Ads Management</h1>

      <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr className="text-xs uppercase tracking-wider text-gray-500">
              <th className="px-6 py-4">Title</th>
              <th className="px-6 py-4">Publisher</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Impressions</th>
              <th className="px-6 py-4">Clicks</th>
              <th className="px-6 py-4 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {ads.map((ad) => {
              const isUpdating = updatingId === ad._id;

              return (
                <tr
                  key={ad._id}
                  className="border-t hover:bg-gray-50 transition duration-200"
                >
                  {/* Title */}
                  <td className="px-6 py-5 font-medium text-gray-800">
                    {ad.title}
                  </td>

                  {/* Publisher */}
                  <td className="px-6 py-5 text-gray-600">
                    {ad.publisher?.name || "Unknown"}
                  </td>

                  {/* Status badge */}
                  <td className="px-6 py-5 text-center">
                    <StatusBadge status={ad.status} />
                  </td>

                  {/* Impressions */}
                  <td className="px-6 py-5 text-gray-600 text-right">
                    {ad.impressions}
                  </td>

                  {/* Clicks */}
                  <td className="px-6 py-5 text-gray-600 text-right">
                    {ad.clicks}
                  </td>

                  {/* Action button */}
                  <td className="px-6 py-5 text-center">
                    <button
                      onClick={() => handleStatusChange(ad)}
                      disabled={isUpdating}
                      className={`rounded-xl px-4 py-2 text-sm font-semibold transition duration-200 active:scale-[0.98]
                        ${
                          ad.status === "active"
                            ? "bg-yellow-50 text-yellow-700 hover:bg-yellow-100"
                            : "bg-green-50 text-green-700 hover:bg-green-100"
                        }
                        disabled:opacity-50`}
                    >
                      {isUpdating
                        ? "Updating..."
                        : ad.status === "draft"
                          ? "Activate"
                          : ad.status === "active"
                            ? "Pause"
                            : "Activate"}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminAds;
