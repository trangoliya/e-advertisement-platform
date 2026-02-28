import Campaign from "../models/Campaign.js";
import Ad from "../models/Ad.js"

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

export const getCampaignAnalytics = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Get all ads under this campaign
    const ads = await Ad.find({ campaign: id });

    // If no ads found
    if (!ads || ads.length === 0) {
      return res.status(200).json({
        success: true,
        data: {
          totalClicks: 0,
          totalImpressions: 0,
          CTR: 0,
        },
      });
    }

    // Calculate totals
    let totalClicks = 0;
    let totalImpressions = 0;

    ads.forEach((ad) => {
      totalClicks += ad.clicks || 0;
      totalImpressions += ad.impressions || 0;
    });

    // Calculate CTR safely
    const CTR =
      totalImpressions > 0
        ? (totalClicks / totalImpressions) * 100
        : 0;

    res.status(200).json({
      success: true,
      data: {
        totalClicks,
        totalImpressions,
        CTR: Number(CTR.toFixed(2)),
      },
    });

  } catch (error) {
    next(error);
  }
};