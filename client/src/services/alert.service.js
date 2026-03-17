import api from "./api";

export const getAlerts = () => api.get("/api/alerts");

export const markAlertRead = (id) =>
  api.patch(`/alerts/${id}/read`);