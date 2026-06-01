import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";

const CampaignComparisonChart = ({ campaigns = [] }) => {
  const data = campaigns.map((ad) => ({
    name: ad.title || "Advertisement",
    clicks: ad.clicks || 0,
    impressions: ad.impressions || 0,
  }));

  if (!campaigns.length) {
    return (
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full">
        <h2 className="text-lg font-semibold mb-4">
          Ad Performance Comparison
        </h2>

        <p className="text-sm text-gray-500">
          No advertisement data available.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 w-full">
      <h2 className="text-lg font-semibold mb-4">Ad Performance Comparison</h2>

      <div className="w-full h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="name" />

            <YAxis />

            <Tooltip />

            <Legend />

            <Bar dataKey="clicks" fill="#3b82f6" radius={[6, 6, 0, 0]} />

            <Bar dataKey="impressions" fill="#6366f1" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CampaignComparisonChart;
