import api from "./api";

// Get only active ads
export const getActiveAds = async () => {
  return await api.get("/api/viewer/ads");
};

// Get single ad by ID
export const getAdById = async (id) => {
  return await api.get(`/api/viewer/ads/${id}`);
};

// Increment click count
export const incrementClick = async (id) => {
  return await api.patch(`/api/viewer/ads/${id}/click`);
};