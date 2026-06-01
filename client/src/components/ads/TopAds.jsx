const TopAds = ({ ads = [] }) => {
  const topAds = [...ads]
    .sort((a, b) => (b.clicks || 0) - (a.clicks || 0))
    .slice(0, 5);

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
      <h3 className="text-lg font-semibold text-textPrimary mb-4">
        Top Performing Ads
      </h3>

      {!topAds.length ? (
        <p className="text-sm text-gray-500">
          No advertisement data available.
        </p>
      ) : (
        <ul className="space-y-3">
          {topAds.map((ad, index) => (
            <li
              key={ad._id}
              className="
                flex
                items-center
                justify-between
                border-b
                border-borderColorCustom
                pb-3
              "
            >
              <div>
                <p className="font-medium text-textPrimary">
                  #{index + 1} {ad.title}
                </p>

                <p className="text-xs text-gray-500">
                  {ad.impressions || 0} impressions
                </p>
              </div>

              <div className="text-right">
                <p className="font-semibold text-blue-500">
                  {ad.clicks || 0}
                </p>

                <p className="text-xs text-gray-500">
                  clicks
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TopAds;