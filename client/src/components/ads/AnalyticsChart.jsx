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
  return (
    <div className="w-full h-80">
  <ResponsiveContainer width="100%" height="100%" minWidth={0}>
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
