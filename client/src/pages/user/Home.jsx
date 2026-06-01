import { useEffect, useState } from "react";
import { getActiveAds } from "../../services/ad.service";
import { getPublisherProfile } from "../../services/publisher.service";
import { useNavigate } from "react-router-dom";
import AdCard from "../../components/ads/AdCard";
import PPAvatar from "../../assets/PP_Avatar.png";
import PublisherOnboardingModal from "../../components/common/PublisherOnboardingModal";

import {
  FiGrid,
  FiBriefcase,
} from "react-icons/fi";

const Home = () => {
  const [ads, setAds] = useState([]);
  const [showPublisherModal, setShowPublisherModal] = useState(false);
  const [isPublisher, setIsPublisher] = useState(false);
  const [loadingPublisher, setLoadingPublisher] = useState(true);

  const navigate = useNavigate();

  const isMobile = window.innerWidth < 768;

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

  const filteredAds = ads.filter((ad) => {
    const channels = ad.campaign?.distributionChannels || ["website"];

    if (isMobile) {
      return channels.includes("mobile");
    }

    return channels.includes("website");
  });

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Publisher Action */}
      <div className="max-w-2xl mx-auto pt-6 flex justify-end px-4">
        {loadingPublisher ? null : isPublisher ? (
          <button
            onClick={() => navigate("/publisher/dashboard")}
            className="inline-flex items-center gap-2 rounded-2xl bg-green-600 px-5 py-3 text-white font-medium hover:bg-green-700 transition"
          >
            <FiGrid />
            Publisher Dashboard
          </button>
        ) : (
          <button
            onClick={() => setShowPublisherModal(true)}
            className="inline-flex items-center gap-2 rounded-2xl bg-indigo-600 px-5 py-3 text-white font-medium hover:bg-indigo-700 transition"
          >
            <FiBriefcase />
            Become a Publisher
          </button>
        )}
      </div>

      {/* Header */}
      <div className="max-w-2xl mx-auto px-4 pt-8 pb-4">
        <h1 className="text-4xl font-bold text-gray-900">
          Advertisement Feed
        </h1>

        <p className="text-gray-500 mt-2">
          Discover sponsored content tailored for you.
        </p>
      </div>

      {/* Feed Stats */}
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm">
          <p className="text-xs uppercase tracking-wide text-gray-500">
            Available Advertisements
          </p>

          <p className="text-3xl font-bold text-indigo-600 mt-1">
            {filteredAds.length}
          </p>
        </div>
      </div>

      {/* Ads Feed */}
      <div className="max-w-2xl mx-auto px-4 py-8 space-y-8">
        {filteredAds.length === 0 ? (
          <div className="bg-white border border-gray-100 rounded-3xl p-16 text-center shadow-sm">
            <h3 className="text-2xl font-bold text-gray-900">
              No Advertisements Available
            </h3>

            <p className="text-gray-500 mt-2">
              New advertisements will appear here once publishers start
              promoting content.
            </p>
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