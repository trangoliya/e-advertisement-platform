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
  const response = await api.patch(`/api/ads/${id}/status`, {
    status,
  });

  return response.data;
};

// Delete Ad
export const deleteAd = async (id) => {
  const response = await api.delete(`/api/ads/${id}`);
  return response.data;
};

// Get Active Ads
export const getActiveAds = async () => {
  const response = await api.get("/api/ads/active");
  return response.data;
};

// Get Ad By ID
export const getAdById = async (id) => {
  const response = await api.get(`/api/ads/${id}`);
  return response.data;
};

// Increment Impression
export const incrementImpression = async (id) => {
  const response = await api.patch(
    `/api/ads/${id}/impression`
  );

  return response.data;
};

// Increment Click
export const incrementClick = async (id) => {
  const response = await api.patch(
    `/api/ads/${id}/click`
  );

  return response.data;
};