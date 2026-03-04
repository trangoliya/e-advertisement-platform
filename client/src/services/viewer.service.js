import api from "./api";

/**
 Save or update viewer profile
 POST /api/viewer/profile
 */
export const saveViewerProfile = async (data) => {
  try {
    const res = await api.post("/api/viewer/profile", data);
    return res.data;
  } catch (error) {
    console.error("Error saving viewer profile:", error);
    throw error;
  }
};

/**
  Get current viewer profile
  GET /api/viewer/profile
 */
export const getViewerProfile = async () => {
  try {
    const response = await api.get("/api/viewer/profile");
    return response.data;
  } catch (error) {
    console.error("Error fetching viewer profile:", error);
    throw error;
  }
};
