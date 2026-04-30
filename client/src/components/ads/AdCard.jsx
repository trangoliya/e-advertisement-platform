import { useEffect, useState, useRef } from "react";
import api from "../../services/api";
import {
  getLikedAds,
  getSavedAds,
  toggleLikeAd,
  toggleSaveAd,
} from "../../utils/adEngagement";
import { useNavigate } from "react-router-dom";

import { FiHeart, FiBookmark, FiEye, FiMousePointer } from "react-icons/fi";
import { FaHeart, FaBookmark } from "react-icons/fa";

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
  template = "standard", // ✅ now used
}) => {
  const hasTracked = useRef(false);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);

  const navigate = useNavigate();
  const baseUrl = "https://e-advertisement-platform.onrender.com";

  useEffect(() => {
    setLiked(getLikedAds().includes(id));
    setSaved(getSavedAds().includes(id));
  }, [id]);

  useEffect(() => {
    if (hasTracked.current) return;
    hasTracked.current = true;

    api.post("/api/ads/track-view", { adId: id }).catch(() => {});
  }, [id]);

  const handleLike = () => {
    toggleLikeAd(id);
    setLiked((prev) => !prev);
  };

  const handleSave = () => {
    toggleSaveAd(id);
    setSaved((prev) => !prev);
  };

  const handleAdClick = () => {
    navigate(`/ads/${id}`);
    api.post("/api/ads/track-click", { adId: id }).catch(() => {});
  };

  const avatarUrl = publisherAvatar
    ? publisherAvatar
    : `https://ui-avatars.com/api/?name=${publisherName}`;

  return (
    <div className="bg-white rounded-2xl shadow border overflow-hidden hover:shadow-xl transition">

      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <img
            src={avatarUrl}
            alt={publisherName}
            className="w-10 h-10 rounded-full object-cover border"
          />
          <p className="text-sm font-semibold">{publisherName}</p>
        </div>

        <button onClick={handleSave}>
          {saved ? <FaBookmark /> : <FiBookmark />}
        </button>
      </div>

      {/* TEMPLATE BASED UI */}

      {/* STANDARD */}
      {template === "standard" && (
        <>
          <div onClick={handleAdClick}>
            {mediaType === "video" ? (
              <video
                src={`${baseUrl}${mediaUrl}`}
                className="w-full h-60 object-cover"
                autoPlay
                muted
                loop
              />
            ) : (
              <img
                src={`${baseUrl}${mediaUrl}`}
                className="w-full h-60 object-cover"
              />
            )}
          </div>

          <div className="p-4">
            <h3 className="font-semibold">{title}</h3>
            <p className="text-sm text-gray-600">{description}</p>
          </div>
        </>
      )}

      {/* COMPACT */}
      {template === "compact" && (
        <div className="p-4">
          <h3 className="font-semibold">{title}</h3>
        </div>
      )}

      {/* BANNER */}
      {template === "banner" && (
        <div className="flex gap-3 p-4">
          <img
            src={`${baseUrl}${mediaUrl}`}
            className="w-28 h-20 object-cover rounded"
          />
          <div>
            <h3 className="font-semibold">{title}</h3>
            <p className="text-sm text-gray-600">{description}</p>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="flex justify-between px-4 pb-4">
        <div className="flex gap-3 text-sm text-gray-500">
          <button onClick={handleLike}>
            {liked ? <FaHeart className="text-red-500" /> : <FiHeart />}
          </button>

          <span className="flex items-center gap-1">
            <FiEye /> {impressions}
          </span>

          <span className="flex items-center gap-1">
            <FiMousePointer /> {clicks}
          </span>
        </div>

        <button
          onClick={handleAdClick}
          className="bg-blue-600 text-white px-3 py-1 rounded"
        >
          Learn More
        </button>
      </div>
    </div>
  );
};

export default AdCard;