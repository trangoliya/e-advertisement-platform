import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";
import AdCard from "../../components/ads/AdCard";
import {
  FiArrowLeft,
  FiBriefcase,
  FiMapPin,
  FiTag,
  FiUser,
  FiLayers,
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
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="max-w-5xl mx-auto">
        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm text-blue-600 hover:underline mb-4"
        >
          <FiArrowLeft /> Back
        </button>

        {/* PROFILE CARD */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <img
              src={avatarUrl}
              alt={user.name}
              className="h-28 w-28 rounded-full object-cover border-4 border-indigo-100"
            />

            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2">
                <FiUser className="text-indigo-600" />

                <h2 className="text-3xl font-bold text-gray-900">
                  {user.name}
                </h2>
              </div>

              {user.companyName && (
                <p className="mt-2 flex items-center justify-center md:justify-start gap-2 text-gray-600">
                  <FiBriefcase />
                  {user.companyName}
                </p>
              )}

              {user.city && (
                <p className="mt-2 flex items-center justify-center md:justify-start gap-2 text-gray-500">
                  <FiMapPin />
                  {user.city}
                </p>
              )}

              {user.interests && (
                <p className="mt-2 flex items-center justify-center md:justify-start gap-2 text-gray-500">
                  <FiTag />
                  {user.interests}
                </p>
              )}

              {user.bio && (
                <p className="mt-4 text-gray-600 max-w-2xl">{user.bio}</p>
              )}
            </div>

            <div className="bg-indigo-50 rounded-2xl px-6 py-4 text-center">
              <p className="text-xs uppercase tracking-wide text-gray-500">
                Active Ads
              </p>

              <p className="text-3xl font-bold text-indigo-600">{ads.length}</p>
            </div>
          </div>
        </div>

        {/* ADS HEADER */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FiLayers className="text-indigo-600" />

            <h3 className="text-2xl font-bold text-gray-900">
              Active Advertisements
            </h3>
          </div>

          <span className="rounded-xl bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-600">
            {ads.length} Ads
          </span>
        </div>

        {/* NO ADS */}
        {ads.length === 0 ? (
          <div className="bg-white p-6 rounded-xl shadow text-center text-gray-500">
            No active ads
          </div>
        ) : (
          <div className="bg-white border border-gray-100 rounded-3xl p-12 text-center shadow-sm">
            <FiLayers className="mx-auto text-5xl text-indigo-400 mb-4" />

            <h3 className="text-xl font-bold text-gray-900">
              No Active Advertisements
            </h3>

            <p className="text-gray-500 mt-2">
              This publisher has not published any active advertisements yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PublisherProfile;
