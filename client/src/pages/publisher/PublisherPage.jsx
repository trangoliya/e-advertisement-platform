import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import StatCard from "../../components/common/StatCard.jsx";
import AnalyticsChart from "../../components/ads/AnalyticsChart.jsx";
import StatusBadge from "../../components/common/StatusBadge";
import { getMyAds } from "../../services/ad.service";
import Button from "../../components/common/Button.jsx";
import Loader from "../../components/common/Loader.jsx";

const PublisherPage = () => {
  const navigate = useNavigate();
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        setLoading(true);
        const res = await getMyAds();
        setAds(res.data || []);
      } catch (err) {
        console.error("Error fetching ads", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAds();
  }, []);

  const totalAds = ads.length;
  const activeAds = ads.filter((ad) => ad.status === "active").length;
  const totalClicks = ads.reduce(
    (sum, ad) => sum + (ad.clicks || 0),
    0
  );
  const totalImpressions = ads.reduce(
    (sum, ad) => sum + (ad.impressions || 0),
    0
  );

  const chartData = [
    { name: "Mon", clicks: totalClicks * 0.12, impressions: totalImpressions * 0.15 },
    { name: "Tue", clicks: totalClicks * 0.18, impressions: totalImpressions * 0.2 },
    { name: "Wed", clicks: totalClicks * 0.14, impressions: totalImpressions * 0.17 },
    { name: "Thu", clicks: totalClicks * 0.16, impressions: totalImpressions * 0.18 },
    { name: "Fri", clicks: totalClicks * 0.2, impressions: totalImpressions * 0.22 },
    { name: "Sat", clicks: totalClicks * 0.1, impressions: totalImpressions * 0.08 },
    { name: "Sun", clicks: totalClicks * 0.1, impressions: totalImpressions * 0.1 },
  ];

  return (
    <div className="p-6 space-y-6 min-h-150">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-textPrimary">
          Publisher Dashboard
        </h1>

        <Button onClick={() => navigate("/publisher/create-ad")}>
          + Add New Ad
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader />
        </div>
      ) : ads.length === 0 ? (
        <div className="bg-bgSecondary border border-borderColorCustom rounded-2xl p-12 text-center space-y-3">
          <p className="text-textSecondary font-medium">
            No ads created yet.
          </p>
          <p className="text-xs text-textSecondary/70">
            Click “Add New Ad” to launch your first campaign.
          </p>
          <div className="pt-3">
            <Button onClick={() => navigate("/publisher/create-ad")}>
              Create First Ad
            </Button>
          </div>
        </div>
      ) : (
        <>
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard title="Total Ads" value={totalAds} />
            <StatCard title="Active Ads" value={activeAds} />
            <StatCard title="Total Clicks" value={totalClicks} />
            <StatCard title="Impressions" value={totalImpressions} />
          </div>

          {/* Chart */}
          <div
            className="bg-bgSecondary border border-borderColorCustom
                       rounded-2xl p-6
                       transition-all duration-200
                       hover:shadow-md hover:-translate-y-0.5"
          >
            <h3 className="text-lg font-semibold text-textPrimary mb-4">
              Performance Overview
            </h3>

            <AnalyticsChart data={chartData} />
          </div>

          {/* Ads Table */}
          <div
            className="bg-bgSecondary border border-borderColorCustom
                       rounded-2xl overflow-hidden
                       transition duration-200 hover:shadow-sm"
          >
            <table className="w-full text-sm">
              <thead className="bg-bgPrimary border-b border-borderColorCustom">
                <tr className="text-xs uppercase tracking-wider text-textSecondary">
                  <th className="px-6 py-4 text-left">Ad Title</th>
                  <th className="px-6 py-4 text-center">Status</th>
                  <th className="px-6 py-4 text-right">Clicks</th>
                </tr>
              </thead>

              <tbody>
                {ads.slice(0, 5).map((ad) => (
                  <tr
                    key={ad._id}
                    className="border-t border-borderColorCustom
                               hover:bg-bgPrimary
                               transition duration-200 ease-in-out"
                  >
                    <td className="px-6 py-5 text-textPrimary">
                      {ad.title}
                    </td>

                    <td className="px-6 py-5 text-center">
                      <StatusBadge status={ad.status} />
                    </td>

                    <td className="px-6 py-5 text-textSecondary text-right">
                      {ad.clicks || 0}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default PublisherPage;