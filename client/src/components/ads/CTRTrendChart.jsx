import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";

const CTRTrendChart = ({ data }) => {

  const ctrData = data.map((d) => ({
    name: d.name,
    ctr: d.impressions
      ? ((d.clicks / d.impressions) * 100).toFixed(2)
      : 0
  }));

  return (
    <div
      className="bg-bgSecondary border border-borderColorCustom
      rounded-2xl p-6 transition-all duration-200
      hover:shadow-md hover:-translate-y-0.5"
    >
      <h3 className="text-lg font-semibold text-textPrimary mb-4">
        CTR Trend
      </h3>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={ctrData}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="name" />

          <YAxis />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="ctr"
            stroke="#10b981"
            strokeWidth={3}
            dot={{ r: 4 }}
          />

        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CTRTrendChart;