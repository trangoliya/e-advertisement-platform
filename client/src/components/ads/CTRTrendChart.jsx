import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";

const CTRTrendChart = ({ data = [] }) => {
  const ctrData = data.map((d) => ({
    name: d.name || "Ad",
    ctr: d.impressions
      ? Number(((d.clicks / d.impressions) * 100).toFixed(2))
      : 0,
  }));

  if (!data.length) {
    return (
      <div
        className="
          bg-bgSecondary
          border border-borderColorCustom
          rounded-2xl
          p-6
        "
      >
        <h3 className="text-lg font-semibold text-textPrimary mb-4">
          CTR Trend
        </h3>

        <p className="text-sm text-gray-500">No CTR data available.</p>
      </div>
    );
  }

  return (
    <div
      className="
        bg-bgSecondary
        border border-borderColorCustom
        rounded-2xl
        p-6
        transition-all
        duration-200
        hover:shadow-md
        hover:-translate-y-0.5
      "
    >
      <h3 className="text-lg font-semibold text-textPrimary mb-4">CTR Trend</h3>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={ctrData}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="name" />

          <YAxis
            label={{
              value: "CTR %",
              angle: -90,
              position: "insideLeft",
            }}
          />

          <Tooltip formatter={(value) => [`${value}%`, "CTR"]} />

          <Legend />

          <Line
            type="monotone"
            dataKey="ctr"
            name="CTR %"
            stroke="#10b981"
            strokeWidth={3}
            dot={{ r: 4 }}
            activeDot={{ r: 7 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CTRTrendChart;
