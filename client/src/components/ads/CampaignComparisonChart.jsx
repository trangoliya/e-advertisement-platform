import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const CampaignComparisonChart = ({ campaigns = [] }) => {
  const data = campaigns.map((campaign) => ({
    name: campaign.name || "Campaign",
    clicks: campaign.clicks || 0,
  }));

  if (!campaigns.length) {
    return (
      <div className="bg-white shadow-lg rounded-xl p-5 w-full">
        <h2 className="text-lg font-semibold mb-4">Campaign Comparison</h2>
        <p className="text-sm text-gray-500">No campaign data available.</p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-lg rounded-xl p-5 w-full">
      <h2 className="text-lg font-semibold mb-4">Campaign Comparison</h2>

      <div className="w-full min-h-[320px]">
  <ResponsiveContainer width="100%" height={320}>
    <BarChart data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="clicks" fill="#3b82f6" radius={[6,6,0,0]} />
    </BarChart>
  </ResponsiveContainer>
</div>
    </div>
  );
};

export default CampaignComparisonChart;
