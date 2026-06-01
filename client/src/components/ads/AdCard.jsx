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
  impressions = 0,
  clicks = 0,
  mediaUrl,
  mediaType = "image",
  publisherName = "Sponsored",
  publisherAvatar,
  publisherId,
  template = "standard",
}) => {
  const hasTracked = useRef(false);

  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);

  const navigate = useNavigate();

  const finalMediaUrl = mediaUrl || "";

  useEffect(() => {
    setLiked(getLikedAds().includes(id));
    setSaved(getSavedAds().includes(id));
  }, [id]);

  useEffect(() => {
    if (hasTracked.current) return;

    hasTracked.current = true;

    api
      .post("/api/ads/track-view", {
        adId: id,
      })
      .catch(() => {});
  }, [id]);

  const handleLike = (e) => {
    e.stopPropagation();

    toggleLikeAd(id);
    setLiked((prev) => !prev);
  };

  const handleSave = (e) => {
    e.stopPropagation();

    toggleSaveAd(id);
    setSaved((prev) => !prev);
  };

  const handleAdClick = () => {
    navigate(`/ads/${id}`);

    api
      .post("/api/ads/track-click", {
        adId: id,
      })
      .catch(() => {});
  };

  const handlePublisherClick = (e) => {
    e.stopPropagation();

    if (publisherId) {
      navigate(`/publisher/${publisherId}`);
    }
  };

  const avatarUrl =
    publisherAvatar ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      publisherName || "Publisher",
    )}`;

  return (
    <div
      onClick={handleAdClick}
      className="
        bg-white
        rounded-2xl
        border
        shadow-sm
        overflow-hidden
        cursor-pointer
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-xl
      "
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3">
        <div
          onClick={handlePublisherClick}
          className="
            flex
            items-center
            gap-3
            cursor-pointer
            hover:opacity-80
          "
        >
          <img
            src={avatarUrl}
            alt={publisherName}
            className="
              w-10
              h-10
              rounded-full
              object-cover
              border
            "
          />

          <div>
            <p className="text-sm font-semibold">{publisherName}</p>

            <p className="text-xs text-gray-400">Sponsored</p>
          </div>
        </div>

        <button
          onClick={handleSave}
          className="text-lg text-gray-600 hover:text-blue-600"
        >
          {saved ? <FaBookmark /> : <FiBookmark />}
        </button>
      </div>

      {/* STANDARD */}
      {template === "standard" && (
        <>
          {mediaType === "video" ? (
            <video
              src={finalMediaUrl}
              className="w-full h-60 object-cover"
              autoPlay
              muted
              loop
              playsInline
            />
          ) : (
            <img
              src={finalMediaUrl}
              alt={title}
              className="w-full h-60 object-cover"
            />
          )}

          <div className="p-4">
            <h3 className="text-lg font-semibold line-clamp-1">{title}</h3>

            <p className="text-sm text-gray-600 mt-1 line-clamp-2">
              {description}
            </p>
          </div>
        </>
      )}

      {/* COMPACT */}
      {template === "compact" && (
        <div className="p-4">
          <h3 className="font-semibold text-base">{title}</h3>

          <p className="text-sm text-gray-600 mt-1 line-clamp-2">
            {description}
          </p>
        </div>
      )}

      {/* BANNER */}
      {template === "banner" && (
        <div className="flex gap-3 p-4">
          {mediaType === "video" ? (
            <video
              src={finalMediaUrl}
              className="w-28 h-20 object-cover rounded-lg"
              autoPlay
              muted
              loop
              playsInline
            />
          ) : (
            <img
              src={finalMediaUrl}
              alt={title}
              className="w-28 h-20 object-cover rounded-lg"
            />
          )}

          <div className="flex-1">
            <h3 className="font-semibold line-clamp-1">{title}</h3>

            <p className="text-sm text-gray-600 line-clamp-2">{description}</p>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="flex justify-between items-center px-4 pb-4">
        <div className="flex gap-4 items-center text-sm text-gray-500">
          <button onClick={handleLike} className="text-lg">
            {liked ? <FaHeart className="text-red-500" /> : <FiHeart />}
          </button>

          <span className="flex items-center gap-1">
            <FiEye />
            {impressions}
          </span>

          <span className="flex items-center gap-1">
            <FiMousePointer />
            {clicks}
          </span>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            handleAdClick();
          }}
          className="
            bg-blue-600
            text-white
            px-4
            py-1.5
            rounded-lg
            text-sm
            hover:bg-blue-700
            transition
          "
        >
          Learn More
        </button>
      </div>
    </div>
  );
};

export default AdCard;
