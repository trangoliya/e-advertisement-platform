import { useEffect, useState } from "react";
import { getMyAds } from "../../services/ad.service";
import StatCard from "../../components/common/StatCard";
import AnalyticsChart from "../../components/ads/AnalyticsChart";
import Loader from "../../components/common/Loader";
import Button from "../../components/common/Button";
import axios from "axios";

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
    const token = localStorage.getItem("token");

    const response = await axios.get(
      "http://localhost:5000/api/campaigns/export",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: "blob",
      },
    );

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");

    link.href = url;
    link.setAttribute("download", "campaign_analytics.csv");
    document.body.appendChild(link);
    link.click();
  };
  const totalClicks = ads.reduce((sum, ad) => sum + (ad.clicks || 0), 0);

  const totalImpressions = ads.reduce(
    (sum, ad) => sum + (ad.impressions || 0),
    0,
  );

  const ctr =
    totalImpressions > 0
      ? ((totalClicks / totalImpressions) * 100).toFixed(2)
      : 0;

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
    <div className="p-6 space-y-8 min-h-125">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-textPrimary">Analytics</h1>
        <p className="text-sm text-textSecondary mt-1">
          Performance overview of your advertisements
        </p>
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <StatCard title="Total Impressions" value={totalImpressions} />
            <StatCard title="Total Clicks" value={totalClicks} />
            <StatCard title="CTR (%)" value={`${ctr}%`} />
          </div>

          {/* Chart / Empty State */}
          {ads.length === 0 ? (
            <div className="bg-bgSecondary border border-borderColorCustom rounded-2xl p-12 text-center space-y-3">
              <p className="text-textSecondary font-medium">
                No performance data yet.
              </p>
              <p className="text-xs text-textSecondary/70">
                Once your ads start getting impressions and clicks, analytics
                will appear here.
              </p>
            </div>
          ) : (
            <div
              className="bg-bgSecondary border border-borderColorCustom
                          rounded-2xl p-6
                          transition-all duration-200 hover:shadow-sm"
            >
              <h3 className="text-lg font-semibold text-textPrimary mb-4">
                Weekly Performance
              </h3>

              <AnalyticsChart data={chartData} />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Analytics;
