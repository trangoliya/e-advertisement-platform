import api from "./api";

// Create Campaign
export const createCampaign = async (campaignData) => {
  const response = await api.post("/api/campaigns", campaignData);
  return response.data;
};

// Get My Campaigns
export const getMyCampaigns = async () => {
  const response = await api.get("/api/campaigns/my");
  return response.data;
};

// Get Campaign Analytics
export const getCampaignAnalytics = async (campaignId) => {
  const response = await api.get(`/api/campaigns/${campaignId}/analytics`);

  return response.data;
};

// Update Campaign
export const updateCampaign = async (campaignId, campaignData) => {
  const response = await api.put(`/api/campaigns/${campaignId}`, campaignData);

  return response.data;
};

// Delete Campaign
export const deleteCampaign = async (campaignId) => {
  const response = await api.delete(`/api/campaigns/${campaignId}`);

  return response.data;
};

// Export Analytics CSV
export const exportCampaignAnalytics = async () => {
  return api.get("/api/campaigns/export", {
    responseType: "blob",
  });
};
