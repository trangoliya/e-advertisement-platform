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
    return <p className="text-center mt-10 text-red-500">Failed to load ad</p>;
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="max-w-4xl mx-auto bg-white border border-gray-100 rounded-3xl shadow-sm p-8">
        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 mb-6 transition"
        >
          <FiArrowLeft /> Back
        </button>

        {/* MEDIA */}
        {ad.mediaUrl &&
          (ad.mediaType === "video" ? (
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
          ))}

        {/* Title */}
        <h2 className="text-4xl font-bold text-gray-900 mb-3">{ad.title}</h2>

        {/* Description */}
        <p className="text-gray-500 leading-relaxed mb-8">{ad.description}</p>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-indigo-50 rounded-2xl p-4">
            <div className="flex items-center gap-2 text-indigo-600 mb-2">
              <FiEye />
              <span className="text-sm font-medium">Impressions</span>
            </div>

            <p className="text-2xl font-bold text-gray-900">
              {ad.impressions || 0}
            </p>
          </div>

          <div className="bg-green-50 rounded-2xl p-4">
            <div className="flex items-center gap-2 text-green-600 mb-2">
              <FiMousePointer />
              <span className="text-sm font-medium">Clicks</span>
            </div>

            <p className="text-2xl font-bold text-gray-900">{ad.clicks || 0}</p>
          </div>
        </div>

        {/* CTA */}
        <button
          onClick={handleVisit}
          disabled={visiting}
          className={`w-full flex items-center justify-center gap-2 rounded-2xl py-4 text-lg font-semibold text-white transition ${
            visiting ? "bg-gray-400" : "bg-indigo-600 hover:bg-indigo-700"
          }`}
        >
          <FiExternalLink />
          {visiting ? "Redirecting..." : "Visit Website"}
        </button>

        {/* Feedback */}
        <div className="mt-6 border-t pt-4">
          <p className="text-lg font-semibold text-gray-900 mb-4">
            Was this advertisement helpful?
          </p>

          <div className="flex gap-4">
            <button
              disabled={feedbackSubmitted}
              onClick={() => sendFeedback("yes")}
              className="flex items-center gap-2 rounded-2xl bg-green-500 px-5 py-3 text-white font-medium hover:bg-green-600 disabled:opacity-50"
            >
              <FiThumbsUp /> Yes
            </button>

            <button
              disabled={feedbackSubmitted}
              onClick={() => sendFeedback("no")}
              className="flex items-center gap-2 rounded-2xl bg-red-500 px-5 py-3 text-white font-medium hover:bg-red-600 disabled:opacity-50"
            >
              <FiThumbsDown /> No
            </button>
          </div>

          {feedbackSubmitted && (
            <p className="mt-4 rounded-xl bg-green-50 border border-green-200 p-3 text-green-700 text-sm">
              Thank you for your feedback!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdDetails;
