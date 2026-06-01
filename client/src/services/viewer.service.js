import api from "./api";

// Save or Update Viewer Profile
export const saveViewerProfile = async (data) => {
  const res = await api.post("/api/viewer/profile", data);

  return res.data;
};

// Get Current Viewer Profile
export const getViewerProfile = async () => {
  const res = await api.get("/api/viewer/profile");

  return res.data;
};

// Update Viewer Profile
export const updateViewerProfile = async (data) => {
  const res = await api.put("/api/viewer/profile", data);

  return res.data;
};
