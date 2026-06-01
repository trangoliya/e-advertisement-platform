import api from "./api";

// Get All Users
export const getAllUsers = async () => {
  const res = await api.get("/api/admin/users");
  return res.data;
};

// Get All Ads
export const getAllAds = async () => {
  const res = await api.get("/api/admin/ads");
  return res.data;
};

// Update Ad Status
export const updateAdStatus = async (id, status) => {
  const res = await api.patch(
    `/api/admin/ads/${id}/status`,
    { status }
  );

  return res.data;
};