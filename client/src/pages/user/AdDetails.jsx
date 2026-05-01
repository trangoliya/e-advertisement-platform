import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getAdById } from "../../services/ad.service";
import api from "../../services/api";

import {
  FiArrowLeft,
  FiEye,
  FiMousePointer,
  FiExternalLink,
  FiThumbsUp,
  FiThumbsDown,
} from "react-icons/fi";

const AdDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [ad, setAd] = useState(null);
  const [visiting, setVisiting] = useState(false);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  useEffect(() => {
    const fetchAd = async () => {
      try {
        const res = await getAdById(id);

        const adData = res.data?.data || res.data?.ad;

        if (adData) {
          setAd(adData);
        } else {
          setAd("error");
        }
      } catch (error) {
        console.error(error);
        setAd("error");
      }
    };

    fetchAd();
  }, [id]);

  const handleVisit = async () => {
    if (!ad || visiting) return;

    try {
      setVisiting(true);

      await api.post("/api/ads/track-click", { adId: ad._id });

      setAd((prev) => ({
        ...prev,
        clicks: prev.clicks + 1,
      }));

      if (ad.targetUrl) {
        window.open(ad.targetUrl, "_blank");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setVisiting(false);
    }
  };

  const sendFeedback = async (response) => {
    try {
      await api.post(`/api/ads/${ad._id}/feedback`, { response });
      setFeedbackSubmitted(true);
    } catch (err) {
      console.error(err);
    }
  };

  if (!ad) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-spin h-10 w-10 rounded-full border-4 border-blue-600 border-t-transparent" />
      </div>
    );
  }

  if (ad === "error") {
    return (
      <p className="text-center mt-10 text-red-500">
        Failed to load ad
      </p>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow p-6">

        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm text-blue-600 hover:underline mb-4"
        >
          <FiArrowLeft /> Back
        </button>

        {/* MEDIA */}
        {ad.mediaUrl && (
          ad.mediaType === "video" ? (
            <video
              src={ad.mediaUrl}
              className="w-full max-h-100 object-cover rounded-xl mb-6"
              controls
            />
          ) : (
            <img
              src={ad.mediaUrl}
              alt={ad.title}
              className="w-full max-h-100 object-cover rounded-xl mb-6"
            />
          )
        )}

        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          {ad.title}
        </h2>

        {/* Description */}
        <p className="text-gray-600 mb-6">
          {ad.description}
        </p>

        {/* Stats */}
        <div className="flex items-center gap-6 text-gray-600 mb-6">
          <span className="flex items-center gap-2">
            <FiEye /> {ad.impressions}
          </span>

          <span className="flex items-center gap-2">
            <FiMousePointer /> {ad.clicks}
          </span>
        </div>

        {/* CTA */}
        <button
          onClick={handleVisit}
          disabled={visiting}
          className={`w-full flex items-center justify-center gap-2 py-3 rounded-lg font-semibold text-white transition ${
            visiting
              ? "bg-gray-400"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          <FiExternalLink />
          {visiting ? "Redirecting..." : "Visit Website"}
        </button>

        {/* Feedback */}
        <div className="mt-6 border-t pt-4">
          <p className="font-semibold mb-3 text-gray-800">
            Was this ad helpful?
          </p>

          <div className="flex gap-4">
            <button
              disabled={feedbackSubmitted}
              onClick={() => sendFeedback("yes")}
              className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50"
            >
              <FiThumbsUp /> Yes
            </button>

            <button
              disabled={feedbackSubmitted}
              onClick={() => sendFeedback("no")}
              className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:opacity-50"
            >
              <FiThumbsDown /> No
            </button>
          </div>

          {feedbackSubmitted && (
            <p className="text-sm text-gray-500 mt-2">
              Thank you for your feedback!
            </p>
          )}
        </div>

      </div>
    </div>
  );
};

export default AdDetails;