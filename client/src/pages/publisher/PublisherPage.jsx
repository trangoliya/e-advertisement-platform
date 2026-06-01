import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import StatCard from "../../components/common/StatCard.jsx";
import AnalyticsChart from "../../components/ads/AnalyticsChart.jsx";
import CampaignComparisonChart from "../../components/ads/CampaignComparisonChart.jsx";
import TopAds from "../../components/ads/TopAds.jsx";
import CTRTrendChart from "../../components/ads/CTRTrendChart.jsx";
import StatusBadge from "../../components/common/StatusBadge";
import { getMyAds } from "../../services/ad.service";
import { getAlerts } from "../../services/alert.service";
import Button from "../../components/common/Button.jsx";
import Loader from "../../components/common/Loader.jsx";
import {
  FiPlusCircle,
  FiGrid,
  FiAlertTriangle,
  FiBarChart2,
} from "react-icons/fi";

const PublisherPage = () => {
  const navigate = useNavigate();

  const [ads, setAds] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        setLoading(true);
        const res = await getMyAds();
        setAds(res?.data || []);
      } catch (err) {
        console.error("Error fetching ads", err);
      } finally {
        setLoading(false);
      }
    };

    const fetchAlerts = async () => {
      try {
        const res = await getAlerts();
        setAlerts(res?.data?.data || []);
      } catch (error) {
        console.error("Error fetching alerts", error);
      }
    };

    fetchAds();
    fetchAlerts();
  }, []);

  const totalAds = ads.length;

  const activeAds = ads.filter((ad) => ad.status === "active").length;

  const totalClicks = ads.reduce((sum, ad) => sum + (ad.clicks || 0), 0);

  const totalImpressions = ads.reduce(
    (sum, ad) => sum + (ad.impressions || 0),
    0,
  );

  const avgCTR =
    totalImpressions > 0
      ? ((totalClicks / totalImpressions) * 100).toFixed(2)
      : 0;

  const chartData = [
    {
      name: "Mon",
      clicks: Math.round(totalClicks * 0.12),
      impressions: Math.round(totalImpressions * 0.15),
    },
    {
      name: "Tue",
      clicks: Math.round(totalClicks * 0.18),
      impressions: Math.round(totalImpressions * 0.2),
    },
    {
      name: "Wed",
      clicks: Math.round(totalClicks * 0.14),
      impressions: Math.round(totalImpressions * 0.17),
    },
    {
      name: "Thu",
      clicks: Math.round(totalClicks * 0.16),
      impressions: Math.round(totalImpressions * 0.18),
    },
    {
      name: "Fri",
      clicks: Math.round(totalClicks * 0.2),
      impressions: Math.round(totalImpressions * 0.22),
    },
    {
      name: "Sat",
      clicks: Math.round(totalClicks * 0.1),
      impressions: Math.round(totalImpressions * 0.08),
    },
    {
      name: "Sun",
      clicks: Math.round(totalClicks * 0.1),
      impressions: Math.round(totalImpressions * 0.1),
    },
  ];

  return (
    <div className="p-6 space-y-6 min-h-150">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <FiGrid className="text-3xl text-indigo-600" />

            <h1 className="text-4xl font-bold text-gray-900">
              Publisher Dashboard
            </h1>
          </div>

          <p className="text-gray-500 mt-2">
            Monitor campaigns, track performance and manage advertisements.
          </p>
        </div>

        <Button onClick={() => navigate("/publisher/create-ad")}>
          <div className="flex items-center gap-2">
            <FiPlusCircle />
            New Advertisement
          </div>
        </Button>
      </div>

      {/* Alerts */}
      {alerts.length > 0 && (
        <div className="space-y-2">
          {alerts.map((alert) => (
            <div
              key={alert._id}
              className="flex items-center gap-3 rounded-2xl border border-yellow-200 bg-yellow-50 p-4 text-yellow-700"
            >
              <FiAlertTriangle />
              {alert.message}
            </div>
          ))}
        </div>
      )}

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader />
        </div>
      ) : ads.length === 0 ? (
        <div className="bg-white border border-gray-100 rounded-3xl p-16 text-center shadow-sm">
          <div className="flex justify-center mb-4">
            <FiAlertTriangle className="text-5xl text-indigo-500" />
          </div>

          <h3 className="text-2xl font-bold text-gray-900">
            No Advertisements Yet
          </h3>

          <p className="text-gray-500 mt-2">
            Create your first advertisement and start reaching your audience.
          </p>

          <div className="mt-6">
            <Button onClick={() => navigate("/publisher/create-ad")}>
              Create First Advertisement
            </Button>
          </div>
        </div>
      ) : (
        <>
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <StatCard title="Total Ads" value={totalAds} />
            <StatCard title="Active Ads" value={activeAds} />
            <StatCard title="Total Clicks" value={totalClicks} />
            <StatCard title="Impressions" value={totalImpressions} />
            <StatCard title="Average CTR" value={`${avgCTR}%`} />
          </div>

          {/* Performance Chart */}
          <div className="bg-white border border-gray-100 shadow-sm rounded-2xl p-6 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5">
            <div className="flex items-center gap-2 mb-4">
              <FiBarChart2 className="text-indigo-600" />
              <h3 className="text-lg font-semibold text-gray-900">
                Performance Overview
              </h3>
            </div>

            <div className="w-full h-80">
              <AnalyticsChart data={chartData} />
            </div>
          </div>

          {/* CTR Trend */}
          <div className="bg-white border border-gray-100 rounded-3xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              CTR Trend
            </h3>

            <div className="h-80">
              <CTRTrendChart data={chartData} />
            </div>
          </div>

          {/* Campaign Comparison */}
          <div className="bg-white border border-gray-100 rounded-3xl shadow-sm p-6">
            <CampaignComparisonChart campaigns={ads.slice(0, 5)} />
          </div>

          {/* Top Ads */}
          <div className="bg-white border border-gray-100 rounded-3xl shadow-sm p-6">
            <TopAds ads={ads} />
          </div>

          {/* Ads Table */}
          <div className="bg-white border border-gray-100 rounded-3xl shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50">
              <h3 className="font-semibold text-gray-900">
                Recent Advertisements
              </h3>

              <span className="text-xs text-gray-500">
                Showing latest 5 ads
              </span>
            </div>

            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr className="text-xs uppercase tracking-wider text-gray-500">
                  <th className="px-6 py-4 text-left">Ad Title</th>

                  <th className="px-6 py-4 text-center">Status</th>

                  <th className="px-6 py-4 text-right">Clicks</th>
                </tr>
              </thead>

              <tbody>
                {ads.slice(0, 5).map((ad) => (
                  <tr
                    key={ad._id}
                    className="border-t border-gray-100 hover:bg-indigo-50/40 transition duration-200"
                  >
                    <td className="px-6 py-5 text-gray-900 font-medium">
                      {ad.title}
                    </td>

                    <td className="px-6 py-5 text-center">
                      <StatusBadge status={ad.status} />
                    </td>

                    <td className="px-6 py-5 text-right text-gray-600">
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
