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
import { useRef } from "react";
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
  template = "standard",
}) => {
  const hasTracked = useRef(false);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);

  const navigate = useNavigate();

  // Load liked & saved state
  useEffect(() => {
    setLiked(getLikedAds().includes(id));
    setSaved(getSavedAds().includes(id));
  }, [id]);

  // Track ad view
useEffect(() => {
  if (hasTracked.current) return;

  hasTracked.current = true;

  api
    .post("/api/ads/track-view", { adId: id })
    .catch((error) => console.error("View tracking failed:", error));
}, [id]);

  const handleLike = () => {
    toggleLikeAd(id);
    setLiked((prev) => !prev);
  };

  const handleSave = () => {
    toggleSaveAd(id);
    setSaved((prev) => !prev);
  };

  // Click + Navigation (optimized)
  const handleAdClick = () => {
    navigate(`/ads/${id}`);

    api
      .post("/api/ads/track-click", { adId: id })
      .catch((err) => console.error("Track click error", err));

    incrementClick(id).catch((err) =>
      console.error("Increment error", err)
    );
  };

  const baseUrl = "https://e-advertisement-platform.onrender.com";

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

        <button onClick={handleSave} className="text-lg">
          {saved ? "🔖" : "📑"}
        </button>
      </div>

      {/* TEMPLATE UI */}

      {/* STANDARD */}
      {template === "standard" && (
        <>
          <div className="bg-black">
            {mediaType === "video" ? (
              <video
                src={`${baseUrl}${mediaUrl}`}
                className="w-full max-h-105 object-cover"
                muted
                autoPlay
                loop
                playsInline
                controls
              />
            ) : (
              mediaUrl && (
                <img
                  src={`${baseUrl}${mediaUrl}`}
                  alt={title}
                  className="w-full max-h-105 object-cover"
                />
              )
            )}
          </div>

          <div className="px-4 py-4">
            <h3 className="text-lg font-semibold text-gray-900">
              {title}
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              {description}
            </p>
          </div>
        </>
      )}

      {/* BANNER */}
      {template === "banner" && (
        <div className="flex items-center gap-4 px-4 py-4">
          {mediaUrl && (
            <img
              src={`${baseUrl}${mediaUrl}`}
              className="w-32 h-20 object-cover rounded-lg"
            />
          )}

          <div>
            <h3 className="font-semibold text-gray-900">
              {title}
            </h3>
            <p className="text-sm text-gray-600">
              {description}
            </p>
          </div>
        </div>
      )}

      {/* COMPACT */}
      {template === "compact" && (
        <div className="px-4 py-3">
          {mediaUrl && (
            <img
              src={`${baseUrl}${mediaUrl}`}
              className="rounded-lg mb-2 w-full h-32 object-cover"
            />
          )}
          <h3 className="text-sm font-semibold text-gray-900">
            {title}
          </h3>
        </div>
      )}

      {/* Footer */}
      <div className="px-4 pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-gray-500 text-sm">
            <button
              onClick={handleLike}
              className={liked ? "text-red-500" : ""}
            >
              {liked ? "❤️" : "🤍"}
            </button>

            <span>👁 {impressions}</span>
            <span>👆 {clicks}</span>
          </div>

          <button
            onClick={handleAdClick}
            className="bg-blue-600 text-white px-4 py-1.5 rounded-lg text-sm hover:bg-blue-700"
          >
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdCard;