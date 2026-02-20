import { useEffect, useState } from "react";
import { getAllAds, updateAdStatus } from "../../services/admin.service";

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
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Ads Management</h1>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full border-collapse">
          <thead className="bg-gray-50 border-b">
            <tr className="text-left text-sm text-gray-600">
              <th className="px-6 py-3">Title</th>
              <th className="px-6 py-3">Publisher</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Impressions</th>
              <th className="px-6 py-3">Clicks</th>
              <th className="px-6 py-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {ads.map((ad) => {
              const isUpdating = updatingId === ad._id;

              return (
                <tr
                  key={ad._id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  {/* Title */}
                  <td className="px-6 py-4 font-medium text-gray-800">
                    {ad.title}
                  </td>

                  {/* Publisher */}
                  <td className="px-6 py-4 text-gray-600">
                    {ad.publisher?.name || "Unknown"}
                  </td>

                  {/* Status badge */}
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-medium
                        ${
                          ad.status === "active"
                            ? "bg-green-100 text-green-700"
                            : ad.status === "paused"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-gray-100 text-gray-700"
                        }`}
                    >
                      {ad.status}
                    </span>
                  </td>

                  {/* Impressions */}
                  <td className="px-6 py-4 text-gray-600">{ad.impressions}</td>

                  {/* Clicks */}
                  <td className="px-6 py-4 text-gray-600">{ad.clicks}</td>

                  {/* Action button */}
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleStatusChange(ad)}
                      disabled={isUpdating}
                      className={`rounded-lg px-4 py-2 text-sm font-medium transition
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
