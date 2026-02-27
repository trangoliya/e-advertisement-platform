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