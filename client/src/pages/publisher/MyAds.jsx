import { useEffect, useState } from "react";
import { getMyAds, updateAdStatus } from "../../services/ad.service";
import StatusBadge from "../../components/common/StatusBadge";
import Loader from "../../components/common/Loader";
import { Navigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const MyAds = () => {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  

  const fetchAds = async () => {
    try {
      setLoading(true);
      const data = await getMyAds();
      setAds(data.data || []);
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
      setUpdatingId(id);
      await updateAdStatus(id, status);
      await fetchAds();
    } catch (error) {
      console.error("Error updating status:", error);
    } finally {
      setUpdatingId(null);
    }
  };
  const location = useLocation();
  const successMessage = location.state?.success;
  return (
    <div className="p-6 space-y-6 min-h-150">
      {/* Header */}
      <h1 className="text-3xl font-bold text-textPrimary">My Ads</h1>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader />
        </div>
      ) : ads.length === 0 ? (
        <div className="bg-bgSecondary border border-borderColorCustom rounded-2xl p-12 text-center space-y-3">
          <p className="text-textSecondary font-medium">
            You haven’t created any ads yet.
          </p>
          <p className="text-xs text-textSecondary/70">
            Start by launching your first advertisement.
          </p>
          <div className="pt-3">
            <Button onClick={() => Navigate("/publisher/create-ad")}>
              Create Ad
            </Button>
          </div>
        </div>
      ) : (
        <div
          className="bg-bgSecondary border border-borderColorCustom
                     rounded-2xl overflow-hidden
                     transition-all duration-200 hover:shadow-sm"
        >
          <table className="w-full text-sm">
            <thead className="bg-bgPrimary border-b border-borderColorCustom">
              <tr className="text-xs uppercase tracking-wider text-textSecondary">
                <th className="px-6 py-4 text-left">Title</th>
                <th className="px-6 py-4 text-center">Status</th>
                <th className="px-6 py-4 text-right">Impressions</th>
                <th className="px-6 py-4 text-right">Clicks</th>
                <th className="px-6 py-4 text-center">Change Status</th>
              </tr>
            </thead>

            <tbody>
              {ads.map((ad) => (
                <tr
                  key={ad._id}
                  className="border-t border-borderColorCustom
                             hover:bg-bgPrimary
                             transition duration-200 ease-in-out"
                >
                  {/* Title */}
                  <td className="px-6 py-5 font-medium text-textPrimary">
                    {ad.title}
                  </td>

                  {/* Status */}
                  <td className="px-6 py-5 text-center">
                    <StatusBadge status={ad.status} />
                  </td>

                  {/* Impressions */}
                  <td className="px-6 py-5 text-textSecondary text-right">
                    {ad.impressions || 0}
                  </td>

                  {/* Clicks */}
                  <td className="px-6 py-5 text-textSecondary text-right">
                    {ad.clicks || 0}
                  </td>

                  {/* Status Select */}
                  <td className="px-6 py-5 text-center">
                    <select
                      value={ad.status}
                      disabled={updatingId === ad._id}
                      onChange={(e) =>
                        handleStatusChange(ad._id, e.target.value)
                      }
                      className="rounded-xl bg-bgPrimary border border-borderColorCustom
                                 px-3 py-2 text-sm font-medium text-textPrimary
                                 outline-none transition duration-200
                                 focus:border-accent focus:ring-2
                                 focus:ring-accent/30
                                 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <option value="active">Active</option>
                      <option value="paused">Paused</option>
                    </select>

                    {updatingId === ad._id && (
                      <div className="mt-2 flex justify-center">
                        <Loader />
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {successMessage && (
            <div className="bg-green-500/10 border border-green-500/30 text-green-400 rounded-xl p-4">
              {successMessage}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MyAds;
