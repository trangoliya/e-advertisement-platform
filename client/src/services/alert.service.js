import api from "./api";

// Get All Alerts
export const getAlerts = async () => {
  const res = await api.get("/api/alerts");
  return res.data;
};

// Mark Alert As Read
export const markAlertRead = async (id) => {
  const res = await api.patch(`/api/alerts/${id}/read`);
  return res.data;
};