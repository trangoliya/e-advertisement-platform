import { useEffect, useState } from "react";
import { getActiveAds } from "../../services/viewer.service";
import { useNavigate } from "react-router-dom";
import PPAvatar from "../../assets/PP_Avatar.png"

const Home = () => {
  const [ads, setAds] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const res = await getActiveAds();
        setAds(res.data.data);
      } catch (error) {
        console.error("Error fetching ads:", error);
      }
    };
    fetchAds();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Feed Container */}
      <div className="max-w-xl mx-auto py-8 space-y-8">
        {ads.length === 0 ? (
          <div className="text-center text-gray-500 py-20">
            No ads available
          </div>
        ) : (
          ads.map((ad) => (
            <div
              key={ad._id}
              className="bg-white rounded-xl shadow"
            >
              {/* Publisher Header */}
              <div className="flex items-center gap-3 p-4">
                <img
                  src={ad.publisher?.avatar || PPAvatar}
                  alt="publisher"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-gray-800">
                    {ad.publisher?.name || "Publisher"}
                  </p>
                  <p className="text-xs text-gray-500">
                    Sponsored
                  </p>
                </div>
              </div>

              {/* Media */}
              <div
                className="cursor-pointer"
                onClick={() => navigate(`/ads/${ad._id}`)}
              >
                {ad.mediaType === "video" ? (
                  <video
                    src={ad.mediaUrl}
                    controls
                    className="w-full max-h-125 object-cover"
                  />
                ) : (
                  <img
                    src={ad.mediaUrl || "https://picsum.photos/600/400"}
                    alt={ad.title}
                    className="w-full max-h-125 object-cover"
                  />
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between px-4 py-3">
                <div className="flex items-center gap-4 text-gray-600">
                  <span>👁 {ad.impressions}</span>
                  <span>🖱 {ad.clicks}</span>
                </div>
                <button
                  onClick={() => navigate(`/ads/${ad._id}`)}
                  className="text-blue-600 font-medium hover:underline"
                >
                  View Ad
                </button>
              </div>

              {/* Caption */}
              <div className="px-4 pb-4">
                <p className="text-sm">
                  <span className="font-semibold">
                    {ad.publisher?.name || "Publisher"}
                  </span>{" "}
                  {ad.description}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;