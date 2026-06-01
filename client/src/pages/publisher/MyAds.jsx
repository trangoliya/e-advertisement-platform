import { useEffect, useState } from "react";
import { getMyAds, updateAdStatus } from "../../services/ad.service";
import StatusBadge from "../../components/common/StatusBadge";
import Loader from "../../components/common/Loader";
import Button from "../../components/common/Button";
import { useLocation, useNavigate } from "react-router-dom";
import { FiAlertCircle, FiCheckCircle, FiPlusCircle } from "react-icons/fi";

const MyAds = () => {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

  const successMessage = location.state?.success;

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

  return (
    <div className="p-6 space-y-6 min-h-150">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">
            My Advertisements
          </h1>

          <p className="text-gray-500 mt-2">
            Manage, monitor and update all your advertisements.
          </p>
        </div>

        <Button onClick={() => navigate("/publisher/create-ad")}>
          Create Advertisement
        </Button>
      </div>

      {/* Success Message */}
      {successMessage && (
        <div className="flex items-center gap-2 rounded-2xl border border-green-200 bg-green-50 p-4 text-green-700">
          <FiCheckCircle className="text-xl" />
          {successMessage}
        </div>
      )}

      {/* Content */}
      {loading ? (
        <div className="flex justify-center py-20">
          <Loader />
        </div>
      ) : ads.length === 0 ? (
        /* Empty State */
        <div className="bg-white border border-gray-100 rounded-3xl p-16 text-center shadow-sm">
          <div className="flex justify-center mb-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50">
              <FiAlertCircle className="text-3xl text-indigo-600" />
            </div>
          </div>

          <h3 className="text-2xl font-bold text-gray-900">
            No Advertisements Yet
          </h3>

          <p className="text-gray-500 mt-2">
            Create your first advertisement and start reaching your audience.
          </p>

          <div className="mt-6">
            <Button onClick={() => navigate("/publisher/create-ad")}>
              <div className="flex items-center gap-2">
                <FiPlusCircle />
                Create Advertisement
              </div>
            </Button>
          </div>
        </div>
      ) : (
        /* Ads Table */
        <div className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr className="text-xs uppercase tracking-wider text-gray-500">
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
                  className="border-t border-gray-100 hover:bg-indigo-50/40 transition duration-200"
                >
                  <td className="px-6 py-5 font-medium text-gray-900">
                    {ad.title}
                  </td>

                  <td className="px-6 py-5 text-center">
                    <StatusBadge status={ad.status} />
                  </td>

                  <td className="px-6 py-5 text-right text-gray-600">
                    {ad.impressions || 0}
                  </td>

                  <td className="px-6 py-5 text-right text-gray-600">
                    {ad.clicks || 0}
                  </td>

                  <td className="px-6 py-5 text-center">
                    <select
                      value={ad.status}
                      disabled={updatingId === ad._id}
                      onChange={(e) =>
                        handleStatusChange(ad._id, e.target.value)
                      }
                      className="rounded-xl border border-gray-300 bg-white
                  px-3 py-2 text-sm font-medium text-gray-900
                  outline-none transition
                  focus:border-indigo-500 focus:ring-2
                  focus:ring-indigo-500/20
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
        </div>
      )}
    </div>
  );
};

export default MyAds;
