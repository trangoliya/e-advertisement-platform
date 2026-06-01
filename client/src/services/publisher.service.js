import api from "./api";

// Create Publisher Profile
export const createPublisherProfile = async (data) => {
  const res = await api.post("/api/publisher/profile", data);

  return res.data;
};

// Get Current Publisher Profile
export const getPublisherProfile = async () => {
  const res = await api.get("/api/publisher/profile");

  return res.data;
};

// Update Publisher Profile
export const updatePublisherProfile = async (data) => {
  const res = await api.put("/api/publisher/profile", data);

  return res.data;
};

// Get Publisher By ID
export const getPublisherById = async (id) => {
  const res = await api.get(`/api/users/publisher/${id}`);

  return res.data;
};
