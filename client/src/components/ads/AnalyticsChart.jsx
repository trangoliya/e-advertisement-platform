import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const AnalyticsChart = ({ data }) => {
  if (!data || data.length === 0) return null;

  return (
    <div className="w-full">
      <ResponsiveContainer width="100%" aspect={3}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="impressions" stroke="#6366f1" />
          <Line type="monotone" dataKey="clicks" stroke="#22c55e" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
export default AnalyticsChart;
