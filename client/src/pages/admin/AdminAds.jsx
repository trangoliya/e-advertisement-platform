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
      await updateAdStatus(ad._id, nextStatus); // api call to update status
      await fetchAds(); // refresh list
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
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Ads Management</h1>

        <p className="text-gray-500 mt-1">
          Monitor, activate and manage advertisement campaigns.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-5 shadow-sm border">
          <p className="text-sm text-gray-500">Total Ads</p>

          <h3 className="text-3xl font-bold mt-2">{ads.length}</h3>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm border">
          <p className="text-sm text-gray-500">Active Ads</p>

          <h3 className="text-3xl font-bold text-green-600 mt-2">
            {ads.filter((a) => a.status === "active").length}
          </h3>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm border">
          <p className="text-sm text-gray-500">Paused Ads</p>

          <h3 className="text-3xl font-bold text-yellow-600 mt-2">
            {ads.filter((a) => a.status === "paused").length}
          </h3>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr className="text-xs uppercase tracking-wider text-gray-500">
                <th className="px-6 py-4 text-left">Title</th>

                <th className="px-6 py-4 text-left">Publisher</th>

                <th className="px-6 py-4 text-center">Status</th>

                <th className="px-6 py-4 text-right">Impressions</th>

                <th className="px-6 py-4 text-right">Clicks</th>

                <th className="px-6 py-4 text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {ads.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center py-12 text-gray-500">
                    No advertisements found
                  </td>
                </tr>
              )}

              {ads.map((ad) => {
                const isUpdating = updatingId === ad._id;

                return (
                  <tr
                    key={ad._id}
                    className="border-t hover:bg-gray-50 transition"
                  >
                    <td className="px-6 py-5 font-medium text-gray-800">
                      {ad.title}
                    </td>

                    <td className="px-6 py-5 text-gray-600">
                      {ad.publisher?.name || "Unknown"}
                    </td>

                    <td className="px-6 py-5 text-center">
                      <StatusBadge status={ad.status} />
                    </td>

                    <td className="px-6 py-5 text-gray-600 text-right">
                      {ad.impressions ?? 0}
                    </td>

                    <td className="px-6 py-5 text-gray-600 text-right">
                      {ad.clicks ?? 0}
                    </td>

                    <td className="px-6 py-5 text-center">
                      <button
                        onClick={() => handleStatusChange(ad)}
                        disabled={isUpdating}
                        className={`rounded-xl px-4 py-2 text-sm font-semibold transition active:scale-[0.98]
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
    </div>
  );
};
export default AdminAds;
