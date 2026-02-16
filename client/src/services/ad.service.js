import api from "./api";

// Create Ad
export const createAd = async (data) => {
  const response = await api.post("/api/ads", data);
  return response.data;
};

// Get My Ads
export const getMyAds = async () => {
  const response = await api.get("/api/ads/my-ads");
  return response.data;
};

// Update Ad Status
export const updateAdStatus = async (id, status) => {
  const response = await api.patch(`/api/ads/${id}/status`, { status });
  return response.data;
};