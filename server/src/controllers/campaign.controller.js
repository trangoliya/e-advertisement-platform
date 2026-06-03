import Campaign from "../models/Campaign.js";
import Ad from "../models/Ad.js";
import Alert from "../models/Alert.js";
import { Parser } from "json2csv";

// Create Campaign
export const createCampaign = async (req, res, next) => {
  try {
    const { name, description, totalBudget, distributionChannels } = req.body;

    if (!name || !totalBudget) {
      return res.status(400).json({
        success: false,
        message: "Name and total budget are required",
      });
    }

    const channels =
      distributionChannels?.length > 0 ? distributionChannels : ["website"];

    const campaign = await Campaign.create({
      name,
      description,
      category,
      totalBudget,
      distributionChannels: channels,
      createdBy: req.user.id,
    });

    return res.status(201).json({
      success: true,
      message: "Campaign created successfully",
      data: campaign,
    });
  } catch (error) {
    next(error);
  }
};
// Get My Campaigns (Publisher only)
export const getMyCampaigns = async (req, res, next) => {
  try {
    const campaigns = await Campaign.find({
      createdBy: req.user.id,
    })
      .sort({ createdAt: -1 })
      .lean();

    return res.status(200).json({
      success: true,
      count: campaigns.length,
      data: campaigns,
    });
  } catch (error) {
    next(error);
  }
};

// Get Campaign Analytics
export const getCampaignAnalytics = async (req, res, next) => {
  try {
    const { id } = req.params;

    const campaign = await Campaign.findById(id).lean();

    if (!campaign) {
      return res.status(404).json({
        success: false,
        message: "Campaign not found",
      });
    }

    const ads = await Ad.find({
      campaign: id,
    }).lean();

    if (ads.length === 0) {
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

    const totals = ads.reduce(
      (acc, ad) => {
        acc.totalClicks += ad.clicks || 0;
        acc.totalImpressions += ad.impressions || 0;
        acc.totalConversions += ad.conversions || 0;
        return acc;
      },
      {
        totalClicks: 0,
        totalImpressions: 0,
        totalConversions: 0,
      },
    );

    const CTR =
      totals.totalImpressions > 0
        ? (totals.totalClicks / totals.totalImpressions) * 100
        : 0;

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

// Export Campaign Analytics as CSV
export const exportCampaignAnalytics = async (req, res, next) => {
  try {
    const campaigns = await Campaign.find({
      createdBy: req.user.id,
    }).lean();

    if (campaigns.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No campaigns found",
      });
    }

    const data = [];

    for (const campaign of campaigns) {
      const ads = await Ad.find({
        campaign: campaign._id,
      }).lean();

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

    const parser = new Parser();
    const csv = parser.parse(data);

    res.header("Content-Type", "text/csv");
    res.attachment("campaign_analytics.csv");

    return res.send(csv);
  } catch (error) {
    next(error);
  }
};
