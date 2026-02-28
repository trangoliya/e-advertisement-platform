import { useEffect, useState } from "react";
import { getMyAds, updateAdStatus } from "../../services/ad.service";
import StatusBadge from "../../components/common/StatusBadge";

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
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-textPrimary">My Ads</h1>
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
              <tr className="text-xs uppercase tracking-wider text-textSecondary">
                <th className="px-6 py-5 text-left">Title</th>
                <th className="px-6 py-5 text-center">Status</th>
                <th className="px-6 py-5 text-right">Impressions</th>
                <th className="px-6 py-5 text-right">Clicks</th>
                <th className="px-6 py-5 text-center">Change Status</th>
              </tr>
            </thead>

            <tbody>
              {ads.map((ad) => (
                <tr
                  key={ad._id}
                  className="border-t border-borderColorCustom hover:bg-bgPrimary transition duration-200"
                >
                  {/* Title */}
                  <td className="px-6 py-5 font-medium text-textPrimary">
                    {ad.title}
                  </td>

                  {/* Status Badge */}
                  <td className="px-6 py-5  ">
                    <StatusBadge status={ad.status} />
                  </td>

                  {/* Impressions */}
                  <td className="px-6 py-5 text-textSecondary text-right">
                    {ad.impressions}
                  </td>

                  {/* Clicks */}
                  <td className="px-6 py-5 text-textSecondary text-right">
                    {ad.clicks}
                  </td>

                  {/* Status Select */}
                  <td className="px-6 py-5">
                    <select
                      value={ad.status}
                      onChange={(e) =>
                        handleStatusChange(ad._id, e.target.value)
                      }
                      className="rounded-xl bg-bgPrimary border border-borderColorCustom
                                px-3 py-2 text-sm font-medium text-textPrimary
                                outline-none transition duration-200
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
