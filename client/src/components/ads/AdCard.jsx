import { useEffect, useState } from "react";
import api from "../../services/api";
import { incrementClick } from "../../services/ad.service";
import {
  getLikedAds,
  getSavedAds,
  toggleLikeAd,
  toggleSaveAd,
} from "../../utils/adEngagement";
import { useNavigate } from "react-router-dom";

const AdCard = ({
  id,
  title,
  description,
  impressions,
  clicks,
  mediaUrl,
  mediaType = "image",
  publisherName = "Sponsored",
  publisherAvatar,
}) => {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);

  // Load liked & saved state
  useEffect(() => {
    setLiked(getLikedAds().includes(id));
    setSaved(getSavedAds().includes(id));
  }, [id]);

  // Track ad view
  useEffect(() => {
    const trackView = async () => {
      try {
        await api.post("/api/ads/track-view", { adId: id });
      } catch (error) {
        console.error("View tracking failed:", error);
      }
    };

    trackView();
  }, [id]);

  const handleLike = () => {
    toggleLikeAd(id);
    setLiked((prev) => !prev);
  };

  const handleSave = () => {
    toggleSaveAd(id);
    setSaved((prev) => !prev);
  };

  // Track ad click
  const navigate = useNavigate();
  const handleAdClick = async () => {
    try {
      await api.post("/api/ads/track-click", { adId: id });
      await incrementClick(id);

      navigate(`/ads/${id}`);
    } catch (error) {
      console.error("Click tracking failed:", error);
    }
    
  };

  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden hover:shadow-xl transition duration-300">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <img
            src={publisherAvatar}
            alt={publisherName}
            className="w-10 h-10 rounded-full object-cover border"
          />

          <div>
            <p className="text-sm font-semibold text-gray-800">
              {publisherName}
            </p>
            <span className="text-xs text-gray-500">Sponsored</span>
          </div>
        </div>

        <button
          onClick={handleSave}
          className="text-lg hover:scale-110 transition"
        >
          {saved ? "🔖" : "📑"}
        </button>
      </div>

      {/* Media */}
      <div onClick={handleAdClick} className="cursor-pointer bg-black">
        {mediaType === "video" ? (
          <video
            src={mediaUrl}
            className="w-full max-h-105 object-cover"
            muted
            loop
            playsInline
          />
        ) : (
          <img
            src={
              mediaUrl ||
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTcT0QGetG2uzAvnYBjODTUeGzqZjpcfsUUQ&s"
            }
            alt={title}
            className="w-full max-h-105 object-cover"
          />
        )}
      </div>

      {/* Content */}
      <div className="px-4 py-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">{title}</h3>

        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{description}</p>

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-4 text-gray-500 text-sm">
            <button
              onClick={handleLike}
              className={`text-xl ${liked ? "text-red-500" : "text-gray-500"}`}
            >
              {liked ? "❤️" : "🤍"}
            </button>

            <span>👁 {impressions}</span>
            <span>👆 {clicks}</span>
          </div>

          <button
            onClick={handleAdClick}
            className="bg-blue-600 text-white px-4 py-1.5 rounded-lg text-sm hover:bg-blue-700 transition"
          >
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdCard;
