import Campaign from "../models/Campaign.js";

// Create Campaign
export const createCampaign = async (req, res) => {
  try {
    const { name, description, totalBudget } = req.body;

    if (!name || !totalBudget) {
      return res.status(400).json({
        message: "Name and total budget are required",
      });
    }

    const campaign = await Campaign.create({
      name,
      description,
      totalBudget,
      createdBy: req.user.id, // comes from auth middleware
    });

    res.status(201).json({
      message: "Campaign created successfully",
      campaign,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating campaign",
      error: error.message,
    });
  }
};

// Get My Campaigns (Publisher only)
export const getMyCampaigns = async (req, res) => {
  try {
    const campaigns = await Campaign.find({
      createdBy: req.user.id,
    }).sort({ createdAt: -1 });

    res.status(200).json(campaigns);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching campaigns",
      error: error.message,
    });
  }
};