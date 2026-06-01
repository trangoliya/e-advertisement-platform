import api from "./api";

// Create Campaign
export const createCampaign = async (data) => {
  const response = await api.post("/api/campaigns", data);
  return response.data;
};

// Get My Campaigns
export const getMyCampaigns = async () => {
  const response = await api.get("/api/campaigns/my");
  return response.data;
};

// Campaign Analytics
export const getCampaignAnalytics = async (id) => {
  const response = await api.get(`/api/campaigns/${id}/analytics`);

  return response.data;
};

// Update Campaign
export const updateCampaign = async (id, data) => {
  const response = await api.put(`/api/campaigns/${id}`, data);

  return response.data;
};

// Delete Campaign
export const deleteCampaign = async (id) => {
  const response = await api.delete(`/api/campaigns/${id}`);

  return response.data;
};

// Export Analytics CSV
export const exportCampaignAnalytics = async () => {
  return api.get("/api/campaigns/export", {
    responseType: "blob",
  });
};
