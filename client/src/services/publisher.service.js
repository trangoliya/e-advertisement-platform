import api from "./api";

// Create publisher profile
export const createPublisherProfile = async (data) => {
  const res = await api.post("/api/publisher/profile", data);
  return res.data;
};

// Get publisher profile
export const getPublisherProfile = async () => {
  const res = await api.get("/api/publisher/profile");
  return res.data;
};