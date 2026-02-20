import { useEffect, useState } from "react";
import defaultAvatar from "../../assets/default-avatar.png";
import {
  getLikedAds,
  getSavedAds,
  toggleLikeAd,
  toggleSaveAd,
} from "../../utils/adEngagement";

const AdCard = ({
  id,
  title,
  description,
  impressions,
  clicks,
  onView,
  mediaUrl,
  mediaType = "image",
  publisherName = "Sponsored",
  publisherAvatar,
}) => {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setLiked(getLikedAds().includes(id));
    setSaved(getSavedAds().includes(id));
  }, [id]);

  const handleLike = () => {
    toggleLikeAd(id);
    setLiked((prev) => !prev);
  };

  const handleSave = () => {
    toggleSaveAd(id);
    setSaved((prev) => !prev);
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-lg transition">
      {/* Publisher Header */}
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <img
            src={publisherAvatar || defaultAvatar}
            alt={publisherName}
            className="w-9 h-9 rounded-full object-cover"
          />
          <div>
            <p className="text-sm font-semibold text-gray-800">
              {publisherName}
            </p>
            <p className="text-xs text-gray-500">Sponsored</p>
          </div>
        </div>

        {/* Save */}
        <button onClick={handleSave} className="text-xl">
          {saved ? "🔖" : "📑"}
        </button>
      </div>

      {/* Media */}
      <div onClick={onView} className="cursor-pointer">
        {mediaType === "video" ? (
          <video
            src={mediaUrl}
            className="w-full max-h-125 object-cover"
            muted
            loop
            playsInline
          />
        ) : (
          <img
            src={mediaUrl || "https://picsum.photos/600/400"}
            alt={title}
            className="w-full max-h-125 object-cover"
          />
        )}
      </div>

      {/* Content */}
      <div className="px-4 py-4">
        <h3 className="text-base font-semibold text-gray-900 mb-1">
          {title}
        </h3>

        <p className="text-sm text-gray-600 line-clamp-2 mb-3">
          {description}
        </p>

        {/* Actions */}
        <div className="flex items-center justify-between">
          <div className="flex gap-4 items-center">
            <button
              onClick={handleLike}
              className={`text-xl transition ${
                liked ? "text-red-500" : "text-gray-600"
              }`}
            >
              {liked ? "❤️" : "🤍"}
            </button>

            <span className="text-xs text-gray-500">
              👁 {impressions} · 👆 {clicks}
            </span>
          </div>

          <button
            onClick={onView}
            className="text-sm font-medium text-blue-600 hover:underline"
          >
            Learn More →
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdCard;