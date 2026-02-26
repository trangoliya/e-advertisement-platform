const StatCard = ({ title, value, icon, trend }) => {
  return (
    <div className="bg-bgSecondary border border-borderColorCustom rounded-2xl p-6 hover:border-accent transition-all duration-200">
      
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-sm text-textSecondary">{title}</h4>
        {icon && <div className="text-accent">{icon}</div>}
      </div>

      <div className="text-3xl font-semibold text-textPrimary">
        {value}
      </div>

      {trend && (
        <p className="text-sm mt-2 text-success">
          {trend}
        </p>
      )}
    </div>
  );
};

export default StatCard;