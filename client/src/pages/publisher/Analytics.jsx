import { useEffect, useState } from "react";
import { getMyAds } from "../../services/ad.service";
import StatCard from "../../components/common/StatCard";
import AnalyticsChart from "../../components/ads/AnalyticsChart";

const Analytics = () => {
  const [ads, setAds] = useState([]);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const res = await getMyAds();
        setAds(res.data || []); // adjust if needed
      } catch (err) {
        console.error("Error fetching ads", err);
      }
    };

    fetchAds();
  }, []);

  const totalClicks = ads?.reduce((sum, ad) => sum + (ad.clicks || 0), 0) || 0;

  const totalImpressions =
    ads?.reduce((sum, ad) => sum + (ad.impressions || 0), 0) || 0;

  const ctr = totalImpressions
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
    <div>
      <h1 className="text-2xl font-semibold text-textPrimary mb-6">
        Analytics
      </h1>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard title="Total Impressions" value={totalImpressions} />
        <StatCard title="Total Clicks" value={totalClicks} />
        <StatCard title="CTR (%)" value={`${ctr}%`} />
      </div>

      {/* Chart */}
      {ads && ads.length > 0 && (
  <div className="bg-bgSecondary border border-borderColorCustom rounded-2xl p-6">
    <h3 className="text-lg font-semibold text-textPrimary mb-4">
      Weekly Performance
    </h3>

    <AnalyticsChart data={chartData} />
  </div>
)}
    </div>
  );
};

export default Analytics;
