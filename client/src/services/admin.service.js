import api from "./api";

export const getAllUsers = async () => {
  const res = await api.get("/api/admin/users");
  return res.data;
};

export const getAllAds = async () => {
  const res = await api.get("/api/admin/ads");
  return res.data;
};

export const updateAdStatus = async (id, status) => {
  const res = await api.patch(`/api/admin/ads/${id}/status`, { status });
  return res.data;
};
