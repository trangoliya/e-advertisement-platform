import { useNavigate } from "react-router-dom";
import StatCard from "../../components/common/StatCard.jsx";
import { useEffect, useState } from "react";
import AnalyticsChart from "../../components/ads/AnalyticsChart.jsx";
import { getMyAds } from "../../services/ad.service";
const PublisherPage = () => {
  const navigate = useNavigate();

  const [ads, setAds] = useState([]);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const res = await getMyAds();
        setAds(res.data); // adjust based on your response structure
      } catch (err) {
        console.error("Error fetching ads", err);
      }
    };

    fetchAds();
  }, []);

  const totalAds = ads?.length || 0;
  const activeAds = ads?.filter((ad) => ad.status === "active")?.length || 0;
  const totalClicks = ads?.reduce((sum, ad) => sum + (ad.clicks || 0), 0) || 0;
  const totalImpressions =
    ads?.reduce((sum, ad) => sum + (ad.impressions || 0), 0) || 0;

  const chartData = [
    {
      name: "Mon",
      clicks: totalClicks * 0.12,
      impressions: totalImpressions * 0.15,
    },
    {
      name: "Tue",
      clicks: totalClicks * 0.18,
      impressions: totalImpressions * 0.2,
    },
    {
      name: "Wed",
      clicks: totalClicks * 0.14,
      impressions: totalImpressions * 0.17,
    },
    {
      name: "Thu",
      clicks: totalClicks * 0.16,
      impressions: totalImpressions * 0.18,
    },
    {
      name: "Fri",
      clicks: totalClicks * 0.2,
      impressions: totalImpressions * 0.22,
    },
    {
      name: "Sat",
      clicks: totalClicks * 0.1,
      impressions: totalImpressions * 0.08,
    },
    {
      name: "Sun",
      clicks: totalClicks * 0.1,
      impressions: totalImpressions * 0.1,
    },
  ];
  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-textPrimary">
          Publisher Dashboard
        </h1>

        <button
          onClick={() => navigate("/publisher/create-ad")}
          className="rounded-lg bg-accent px-6 py-2
                     text-white font-medium hover:bg-accentHover transition"
        >
          + Add New Ad
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="Total Ads" value={totalAds} />
        <StatCard title="Active Ads" value={activeAds} />
        <StatCard title="Total Clicks" value={totalClicks} />
        <StatCard title="Impressions" value={totalImpressions} />
      </div>

      {/* chart */}
      {ads && ads.length > 0 && (
        <div className="bg-bgSecondary border border-borderColorCustom rounded-2xl p-6 mb-8">
          <h3 className="text-lg font-semibold text-textPrimary mb-4">
            Performance Overview
          </h3>

          <AnalyticsChart data={chartData} />
        </div>
      )}
      {/* Ads Table */}
      <div className="bg-bgSecondary border border-borderColorCustom rounded-2xl overflow-hidden">
        <table className="w-full border-collapse">
          <thead className="bg-bgPrimary border-b border-borderColorCustom">
            <tr className="text-left text-sm text-textSecondary">
              <th className="px-6 py-3">Ad Title</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Clicks</th>
            </tr>
          </thead>

          <tbody>
            {/* Sample Row 1 */}
            <tr className="border-t border-borderColorCustom hover:bg-bgPrimary transition">
              <td className="px-6 py-4 text-textPrimary">
                Summer Sale Campaign
              </td>

              <td className="px-6 py-4">
                <span className="rounded-full bg-success/20 px-3 py-1 text-xs font-medium text-success">
                  Active
                </span>
              </td>

              <td className="px-6 py-4 text-textSecondary">342</td>
            </tr>

            {/* Sample Row 2 */}
            <tr className="border-t border-borderColorCustom hover:bg-bgPrimary transition">
              <td className="px-6 py-4 text-textPrimary">New Product Launch</td>

              <td className="px-6 py-4">
                <span className="rounded-full bg-warning/20 px-3 py-1 text-xs font-medium text-warning">
                  Paused
                </span>
              </td>

              <td className="px-6 py-4 text-textSecondary">189</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PublisherPage;
