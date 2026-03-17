const TopAds = ({ ads }) => {
  // Sort ads by clicks (highest first) and take top 5
  const topAds = [...ads]
    .sort((a, b) => (b.clicks || 0) - (a.clicks || 0))
    .slice(0, 5);

  return (
    <div
      className="bg-bgSecondary border border-borderColorCustom
      rounded-2xl p-6 transition-all duration-200
      hover:shadow-md hover:-translate-y-0.5"
    >
      <h3 className="text-lg font-semibold text-textPrimary mb-4">
        Top Performing Ads
      </h3>

      <ul className="space-y-3">
        {topAds.map((ad, index) => (
          <li
            key={ad._id}
            className="flex items-center justify-between
            border-b border-borderColorCustom pb-2"
          >
            <span className="text-textPrimary font-medium">
              {index + 1}. {ad.title}
            </span>

            <span className="text-blue-500 font-semibold">
              {ad.clicks || 0} clicks
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopAds;