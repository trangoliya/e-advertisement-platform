import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";
import AdCard from "../../components/ads/AdCard";

import {
  FiArrowLeft,
  FiBriefcase,
  FiMapPin,
  FiTag,
} from "react-icons/fi";

const PublisherProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get(`/api/users/publisher/${id}`);
        setData(res.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProfile();
  }, [id]);

  if (!data) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-spin h-10 w-10 rounded-full border-4 border-blue-600 border-t-transparent" />
      </div>
    );
  }

  const { user, ads } = data;

  const avatarUrl =
    user.avatar || `https://ui-avatars.com/api/?name=${user.name}`;

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8">
      <div className="max-w-5xl mx-auto">

        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm text-blue-600 hover:underline mb-4"
        >
          <FiArrowLeft /> Back
        </button>

        {/* PROFILE CARD */}
        <div className="bg-white rounded-2xl shadow p-6 mb-6 flex flex-col md:flex-row items-center gap-6">

          <img
            src={avatarUrl}
            alt={user.name}
            className="w-24 h-24 rounded-full object-cover border"
          />

          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold">{user.name}</h2>

            {user.companyName && (
              <p className="flex items-center justify-center md:justify-start gap-2 text-gray-600 text-sm mt-1">
                <FiBriefcase /> {user.companyName}
              </p>
            )}

            {user.city && (
              <p className="flex items-center justify-center md:justify-start gap-2 text-gray-500 text-sm mt-1">
                <FiMapPin /> {user.city}
              </p>
            )}

            {user.interests && (
              <p className="flex items-center justify-center md:justify-start gap-2 text-gray-500 text-sm mt-1">
                <FiTag /> {user.interests}
              </p>
            )}

            {user.bio && (
              <p className="text-gray-600 text-sm mt-3 max-w-md">
                {user.bio}
              </p>
            )}
          </div>
        </div>

        {/* ADS HEADER */}
        <div className="mb-3 flex justify-between items-center">
          <h3 className="text-lg font-semibold">
            Active Ads ({ads.length})
          </h3>
        </div>

        {/* NO ADS */}
        {ads.length === 0 ? (
          <div className="bg-white p-6 rounded-xl shadow text-center text-gray-500">
            No active ads
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {ads.map((ad) => (
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
                publisherId={user._id}
                publisherName={user.name}
                publisherAvatar={user.avatar}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PublisherProfile;