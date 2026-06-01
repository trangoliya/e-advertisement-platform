const StatCard = ({ title, value, icon, trend }) => {
  const isPositive =
    trend && (trend.includes("+") || trend.toLowerCase().includes("increase"));

  return (
    <div
      className="
        bg-bgSecondary
        border
        border-borderColorCustom
        rounded-2xl
        p-6
        transition-all
        duration-200
        hover:border-accent
        hover:shadow-md
        hover:-translate-y-1
      "
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-sm font-medium text-textSecondary">{title}</h4>

        {icon && (
          <div
            className="
              text-accent
              text-xl
              bg-accent/10
              p-2
              rounded-lg
            "
          >
            {icon}
          </div>
        )}
      </div>

      {/* Value */}
      <div className="text-3xl font-bold text-textPrimary">{value}</div>

      {/* Trend */}
      {trend && (
        <p
          className={`text-sm mt-2 font-medium ${
            isPositive ? "text-green-500" : "text-red-500"
          }`}
        >
          {trend}
        </p>
      )}
    </div>
  );
};

export default StatCard;
