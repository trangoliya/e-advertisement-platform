import { useEffect, useState } from "react";
import { getActiveAds } from "../../services/ad.service";
import { getPublisherProfile } from "../../services/publisher.service";
import { useNavigate } from "react-router-dom";
import AdCard from "../../components/ads/AdCard";
import PPAvatar from "../../assets/PP_Avatar.png";
import PublisherOnboardingModal from "../../components/common/PublisherOnboardingModal";

const Home = () => {
  const [ads, setAds] = useState([]);
  const [showPublisherModal, setShowPublisherModal] = useState(false);
  const [isPublisher, setIsPublisher] = useState(false);
  const [loadingPublisher, setLoadingPublisher] = useState(true);

  const navigate = useNavigate();

  // Detect device type
  const isMobile = window.innerWidth < 768;

  // Fetch ads
  useEffect(() => {
    const fetchAds = async () => {
      try {
        const res = await getActiveAds();
        setAds(res.data || []);
      } catch (error) {
        console.error("Error fetching ads:", error);
      }
    };

    fetchAds();
  }, []);

  // Check publisher profile
  useEffect(() => {
    const checkPublisher = async () => {
      try {
        const res = await getPublisherProfile();

        if (res?.isPublisher) {
          setIsPublisher(true);
        }
      } catch {
        setIsPublisher(false);
      } finally {
        setLoadingPublisher(false);
      }
    };

    checkPublisher();
  }, []);

  // Filter ads based on distribution channel
  const filteredAds = ads.filter((ad) => {
    const channels = ad.campaign?.distributionChannels || ["website"];

    if (isMobile) {
      return channels.includes("mobile");
    }

    return channels.includes("website");
  });

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Publisher Button */}
      <div className="max-w-xl mx-auto pt-6 flex justify-end">
        {loadingPublisher ? null : isPublisher ? (
          <button
            onClick={() => navigate("/publisher/dashboard")}
            className="bg-green-600 text-white px-4 py-2 rounded-lg"
          >
            Go to Publisher Dashboard
          </button>
        ) : (
          <button
            onClick={() => setShowPublisherModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Switch to Publisher
          </button>
        )}
      </div>

      {/* Ads Feed */}
      <div className="max-w-xl mx-auto py-8 space-y-8">
        {filteredAds.length === 0 ? (
          <div className="text-center text-gray-500 py-20">
            No ads available
          </div>
        ) : (
          filteredAds.map((ad) => (
            <AdCard
              key={ad._id}
              id={ad._id}
              title={ad.title}
              description={ad.description}
              impressions={ad.impressions}
              clicks={ad.clicks}
              mediaUrl={ad.mediaUrl}
              mediaType={ad.mediaType}
              template={ad.template}
              publisherId={ad.createdBy?._id}
              publisherName={ad.createdBy?.name || "Publisher"}
              publisherAvatar={ad.createdBy?.avatar || PPAvatar}
            />
          ))
        )}
      </div>

      {/* Publisher Modal */}
      {showPublisherModal && !isPublisher && (
        <PublisherOnboardingModal
          onClose={() => setShowPublisherModal(false)}
        />
      )}
    </div>
  );
};

export default Home;
