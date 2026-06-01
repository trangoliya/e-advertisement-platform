import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";

const AnalyticsChart = ({ data = [] }) => {
  if (!data.length) {
    return (
      <div className="flex items-center justify-center h-80 bg-white rounded-2xl shadow border">
        <p className="text-gray-500">No analytics data available</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow border p-4">
      <h2 className="text-lg font-semibold mb-4">Campaign Performance</h2>

      <ResponsiveContainer width="100%" height={320}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="name" />

          <YAxis />

          <Tooltip />

          <Legend />

          <Line
            type="monotone"
            dataKey="impressions"
            name="Impressions"
            stroke="#6366f1"
            strokeWidth={3}
            dot={{ r: 4 }}
            activeDot={{ r: 7 }}
          />

          <Line
            type="monotone"
            dataKey="clicks"
            name="Clicks"
            stroke="#22c55e"
            strokeWidth={3}
            dot={{ r: 4 }}
            activeDot={{ r: 7 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AnalyticsChart;
