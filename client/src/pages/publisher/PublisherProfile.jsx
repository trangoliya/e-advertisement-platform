import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";
import AdCard from "../../components/ads/AdCard";

import { FiArrowLeft, FiBriefcase } from "react-icons/fi";

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
        <div className="bg-white rounded-2xl shadow p-6 mb-6 flex items-center gap-5">
          <img
            src={avatarUrl}
            alt={user.name}
            className="w-20 h-20 rounded-full object-cover border"
          />

          <div>
            <h2 className="text-xl font-bold">{user.name}</h2>

            {user.companyName && (
              <p className="flex items-center gap-2 text-gray-600 text-sm">
                <FiBriefcase /> {user.companyName}
              </p>
            )}

            {user.bio && (
              <p className="text-gray-500 text-sm mt-1">
                {user.bio}
              </p>
            )}
          </div>
        </div>

        {/* ADS */}
        <div className="mb-3 flex justify-between items-center">
          <h3 className="text-lg font-semibold">
            Active Ads ({ads.length})
          </h3>
        </div>

        {ads.length === 0 ? (
          <p className="text-gray-500">No active ads</p>
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