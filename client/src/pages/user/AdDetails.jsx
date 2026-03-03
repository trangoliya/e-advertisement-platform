import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { incrementClick, getAdById } from "../../services/ad.service";

const AdDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ad, setAd] = useState(null);
  const [visiting, setVisiting] = useState(false);

  useEffect(() => {
    const fetchAd = async () => {
      try {
        const res = await getAdById(id);
        setAd(res.data.data);
      } catch (error) {
        console.error("Error fetching ad:", error);
      }
    };
    fetchAd();
  }, [id]);

  const handleVisit = async () => {
    if (!ad || visiting) return;

    try {
      setVisiting(true);
      await incrementClick(ad._id);

      setAd((prev) => ({
        ...prev,
        clicks: prev.clicks + 1,
      }));

      window.open(ad.targetUrl, "_blank");
    } catch (error) {
      console.error("Error increment click:", error);
    } finally {
      setVisiting(false);
    }
  };

  /* Loading state */
  if (!ad) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-spin h-10 w-10 rounded-full border-4 border-blue-600 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow p-6">
        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="mb-4 text-sm text-blue-600 hover:underline"
        >
          ← Back
        </button>

        {/* Media */}
        {ad.mediaUrl && (
          <img
            src={ad.mediaUrl}
            alt={ad.title}
            className="w-full max-h-125 object-cover rounded-xl mb-6"
          />
        )}

        {/* Title & Description */}
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{ad.title}</h2>
        <p className="text-gray-600 mb-6">{ad.description}</p>

        {/* Stats */}
        <div className="flex items-center gap-6 text-gray-700 mb-6">
          <span>👁 {ad.impressions} impressions</span>
          <span>👆 {ad.clicks} clicks</span>
        </div>

        {/* CTA */}
        <button
          onClick={handleVisit}
          disabled={visiting}
          className={`w-full rounded-lg py-3 font-semibold text-white transition
            ${
              visiting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
        >
          {visiting ? "Redirecting..." : "Visit Website"}
        </button>
      </div>
    </div>
  );
};

export default AdDetails;
