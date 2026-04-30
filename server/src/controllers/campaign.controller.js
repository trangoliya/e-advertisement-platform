import Campaign from "../models/Campaign.js";
import Ad from "../models/Ad.js";
import Alert from "../models/Alert.js";
import { Parser } from "json2csv";

// Create Campaign
export const createCampaign = async (req, res) => {
  try {
    const { name, description, totalBudget, distributionChannels } = req.body;

    if (!name || !totalBudget) {
      return res.status(400).json({
        message: "Name and total budget are required",
      });
    }

    // if no channel selected → default website
    const channels =
      distributionChannels && distributionChannels.length > 0
        ? distributionChannels
        : ["website"];

    const campaign = await Campaign.create({
      name,
      description,
      totalBudget,
      distributionChannels: channels,
      createdBy: req.user.id,
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

    // Validate campaign
    const campaign = await Campaign.findById(id);
    if (!campaign) {
      return res.status(404).json({
        success: false,
        message: "Campaign not found",
      });
    }

    // Get ads
    const ads = await Ad.find({ campaign: id });

    // No ads case
    if (!ads.length) {
      return res.status(200).json({
        success: true,
        data: {
          totalClicks: 0,
          totalImpressions: 0,
          totalConversions: 0,
          CTR: 0,
        },
      });
    }

    // Use reduce (clean)
    const totals = ads.reduce(
      (acc, ad) => {
        acc.totalClicks += ad.clicks || 0;
        acc.totalImpressions += ad.impressions || 0;
        acc.totalConversions += ad.conversions || 0;
        return acc;
      },
      { totalClicks: 0, totalImpressions: 0, totalConversions: 0 }
    );

    const CTR =
      totals.totalImpressions > 0
        ? (totals.totalClicks / totals.totalImpressions) * 100
        : 0;

    // Optimization alert (safe)
    if (CTR < 1 && totals.totalImpressions > 50) {
      const existingAlert = await Alert.findOne({
        campaignId: id,
        type: "optimization",
      });

      if (!existingAlert) {
        await Alert.create({
          userId: campaign.createdBy,
          campaignId: id,
          message:
            "Campaign performance is low. Consider adjusting targeting or ad design.",
          type: "optimization",
        });
      }
    }

    return res.status(200).json({
      success: true,
      data: {
        ...totals,
        CTR: Number(CTR.toFixed(2)),
      },
    });
  } catch (error) {
    next(error);
  }
};

export const exportCampaignAnalytics = async (req, res, next) => {
  try {
    const campaigns = await Campaign.find({
      createdBy: req.user.id,
    });

    if (!campaigns) {
      return res.status(200).json({
        success: true,
        message: "No campaigns found",
      });
    }

    const data = [];

    for (const campaign of campaigns) {
      const ads = await Ad.find({ campaign: campaign._id });

      let totalClicks = 0;
      let totalImpressions = 0;
      let totalConversions = 0;

      ads.forEach((ad) => {
        totalClicks += ad.clicks || 0;
        totalImpressions += ad.impressions || 0;
        totalConversions += ad.conversions || 0;
      });

      const ctr =
        totalImpressions > 0
          ? ((totalClicks / totalImpressions) * 100).toFixed(2) + "%"
          : "0%";

      data.push({
        CampaignName: campaign.name,
        Impressions: totalImpressions,
        Clicks: totalClicks,
        Conversions: totalConversions,
        CTR: ctr,
        Budget: campaign.totalBudget,
      });
    }

    // Convert JSON to CSV
    const parser = new Parser();
    const csv = parser.parse(data);

    // Send CSV file
    res.header("Content-Type", "text/csv");
    res.attachment("campaign_analytics.csv");

    res.send(csv);
  } catch (error) {
    next(error);
  }
};
