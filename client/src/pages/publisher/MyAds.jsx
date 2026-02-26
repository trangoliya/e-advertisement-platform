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
      fetchAds();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  /* Loading */
  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin h-10 w-10 rounded-full border-4 border-accent border-t-transparent" />
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-textPrimary">My Ads</h2>
      </div>

      {ads.length === 0 ? (
        <div className="bg-bgSecondary border border-borderColorCustom rounded-2xl p-10 text-center text-textSecondary">
          No ads found
        </div>
      ) : (
        <div className="bg-bgSecondary border border-borderColorCustom rounded-2xl overflow-hidden">
          <table className="w-full border-collapse">
            {/* Table Head */}
            <thead className="bg-bgPrimary border-b border-borderColorCustom">
              <tr className="text-left text-sm text-textSecondary">
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
                  className="border-t border-borderColorCustom hover:bg-bgPrimary transition"
                >
                  {/* Title */}
                  <td className="px-6 py-4 font-medium text-textPrimary">
                    {ad.title}
                  </td>

                  {/* Status Badge */}
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-medium
                        ${
                          ad.status === "active"
                            ? "bg-success/20 text-success"
                            : "bg-warning/20 text-warning"
                        }`}
                    >
                      {ad.status}
                    </span>
                  </td>

                  {/* Impressions */}
                  <td className="px-6 py-4 text-textSecondary">
                    {ad.impressions}
                  </td>

                  {/* Clicks */}
                  <td className="px-6 py-4 text-textSecondary">{ad.clicks}</td>

                  {/* Status Select */}
                  <td className="px-6 py-4">
                    <select
                      value={ad.status}
                      onChange={(e) =>
                        handleStatusChange(ad._id, e.target.value)
                      }
                      className="rounded-lg bg-bgPrimary border border-borderColorCustom
                                 px-3 py-2 text-sm text-textPrimary
                                 outline-none transition
                                 focus:border-accent focus:ring-2
                                 focus:ring-accent/30"
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
