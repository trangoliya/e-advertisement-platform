import { useEffect, useState } from "react";
import { getMyAds } from "../../services/ad.service";
import StatCard from "../../components/common/StatCard";
import AnalyticsChart from "../../components/ads/AnalyticsChart";
import Loader from "../../components/common/Loader";
import Button from "../../components/common/Button";
import api from "../../services/api";

const Analytics = () => {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAds = async () => {
      try {
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

  const exportCSV = async () => {
    try {
      const response = await api.get("/api/campaigns/export", {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");

      link.href = url;
      link.setAttribute("download", "campaign_analytics.csv");

      document.body.appendChild(link);
      link.click();

      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Export failed:", error);
    }
  };
  const totalClicks = ads.reduce((sum, ad) => sum + (ad.clicks || 0), 0);

  const totalConversions = ads.reduce(
    (sum, ad) => sum + (ad.conversions || 0),
    0,
  );

  const totalImpressions = ads.reduce(
    (sum, ad) => sum + (ad.impressions || 0),
    0,
  );

  const ctr =
    totalImpressions > 0
      ? ((totalClicks / totalImpressions) * 100).toFixed(2)
      : 0;
  const activeCampaigns = ads.filter((ad) => ad.status === "active").length;

  const topPerformingAd =
    ads.length > 0
      ? ads.reduce((best, current) =>
          (current.clicks || 0) > (best.clicks || 0) ? current : best,
        )
      : null;
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
    <div className="p-6 space-y-8 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Analytics Dashboard
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            Performance overview of your advertisements
          </p>
        </div>

        <Button onClick={exportCSV}>Export CSV</Button>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader />
        </div>
      ) : (
        <>
          {/* Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4">
            <StatCard title="Total Impressions" value={totalImpressions} />

            <StatCard title="Total Clicks" value={totalClicks} />

            <StatCard title="Conversions" value={totalConversions} />

            <StatCard title="CTR" value={`${ctr}%`} />

            <StatCard title="Active Campaigns" value={activeCampaigns} />
          </div>
          {topPerformingAd && (
            <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all duration-300">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Top Performing Ad
              </h3>

              <p className="text-xl font-bold text-indigo-600">
                {topPerformingAd.title}
              </p>

              <div className="mt-3 flex gap-6 text-sm text-gray-500">
                <span>Clicks: {topPerformingAd.clicks || 0}</span>

                <span>Impressions: {topPerformingAd.impressions || 0}</span>
              </div>
            </div>
          )}
          {/* Chart / Empty State */}
          {ads.length === 0 ? (
            <div className="bg-white border border-gray-100 rounded-3xl p-12 text-center">
              <div className="text-6xl mb-4">📊</div>

              <h3 className="text-xl font-semibold text-gray-800">
                No Analytics Available
              </h3>

              <p className="text-gray-500 mt-2">
                Publish your first advertisement to start tracking performance.
              </p>
            </div>
          ) : (
            <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    Weekly Performance
                  </h3>

                  <p className="text-sm text-gray-500">
                    Clicks and impressions overview
                  </p>
                </div>
              </div>

              <AnalyticsChart data={chartData} />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Analytics;
