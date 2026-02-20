import { useEffect, useState } from "react";
import { getMyAds, updateAdStatus } from "../../services/ad.service";

const MyAds = () => {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAds = async () => {
    try {
      setLoading(true);
      const data = await getMyAds();
      setAds(data.data);
    } catch (error) {
      console.error("Error fetching ads:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAds();
  }, []);

  const handleStatusChange = async (id, status) => {
    try {
      await updateAdStatus(id, status);
      fetchAds(); // refresh list
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  /* Loading */
  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin h-10 w-10 rounded-full border-4 border-blue-600 border-t-transparent" />
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">My Ads</h2>
      </div>

      {ads.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-10 text-center text-gray-500">
          No ads found
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="w-full border-collapse">
            <thead className="bg-gray-50 border-b">
              <tr className="text-left text-sm text-gray-600">
                <th className="px-6 py-3">Title</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Impressions</th>
                <th className="px-6 py-3">Clicks</th>
                <th className="px-6 py-3">Change Status</th>
              </tr>
            </thead>

            <tbody>
              {ads.map((ad) => (
                <tr
                  key={ad._id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  {/* Title */}
                  <td className="px-6 py-4 font-medium text-gray-800">
                    {ad.title}
                  </td>

                  {/* Status Badge */}
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-medium
                        ${
                          ad.status === "active"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                    >
                      {ad.status}
                    </span>
                  </td>

                  {/* Impressions */}
                  <td className="px-6 py-4 text-gray-600">
                    {ad.impressions}
                  </td>

                  {/* Clicks */}
                  <td className="px-6 py-4 text-gray-600">
                    {ad.clicks}
                  </td>

                  {/* Status Select */}
                  <td className="px-6 py-4">
                    <select
                      value={ad.status}
                      onChange={(e) =>
                        handleStatusChange(ad._id, e.target.value)
                      }
                      className="rounded-lg border border-gray-300 px-3 py-2
                                 text-sm outline-none
                                 focus:border-blue-500 focus:ring-2
                                 focus:ring-blue-500/30"
                    >
                      <option value="active">Active</option>
                      <option value="paused">Paused</option>
                    </select>
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

export default MyAds;