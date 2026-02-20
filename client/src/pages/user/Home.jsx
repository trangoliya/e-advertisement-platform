import { useEffect, useState } from "react";
import { getActiveAds } from "../../services/viewer.service";
import { useNavigate } from "react-router-dom";
import AdCard from "../../components/ads/AdCard";
import PPAvatar from "../../assets/PP_Avatar.png";

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
            <AdCard
              key={ad._id}
              id={ad._id}
              title={ad.title}
              description={ad.description}
              impressions={ad.impressions}
              clicks={ad.clicks}
              mediaUrl={ad.mediaUrl}
              mediaType={ad.mediaType}
              publisherName={ad.publisher?.name || "Publisher"}
              publisherAvatar={ad.publisher?.avatar || PPAvatar}
              onView={() => navigate(`/ads/${ad._id}`)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Home;