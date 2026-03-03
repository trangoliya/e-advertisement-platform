import Ad from "../models/Ad.js";
import mongoose from "mongoose";
import Campaign from "../models/Campaign.js";

// use for create a Ad
export const createAd = async (req, res, next) => {
  try {
    const {
      title,
      description,
      imageUrl,
      targetUrl,
      status,
      campaignId,
    } = req.body;

    if (!campaignId) {
      return res.status(400).json({
        success: false,
        message: "Campaign ID is required",
      });
    }

    const ad = await Ad.create({
      title,
      description,
      imageUrl,
      targetUrl,
      status,
      campaign: campaignId, // LINK TO CAMPAIGN
      createdBy: req.user.id, // use id (based on your auth middleware)
    });

    res.status(201).json({
      success: true,
      data: ad,
    });

  } catch (error) {
    next(error);
  }
};

// For get Ad
export const getMyAds = async (req, res, next) => {
  try {
    const ads = await Ad.find({
      createdBy: req.user.id,
    });
    res.status(200).json({
      success: true,
      count: ads.length,
      data: ads,
    });
  } catch (error) {
    next(error);
  }
};

// increment function for Impression - how many user see your add
export const incrementImpression = async (req, res, next) => {
  try {
    const ad = await Ad.findByIdAndUpdate(
      req.params._id,
      { $inc: { impressions: 1 } },
      { new: true },
    );

    if (!ad) {
      return res.status(404).json({
        message: "Ad not found",
      });
    }
    res.status(200).json(ad);
  } catch (error) {
    next(error);
  }
};

// increment function for click event - how many user click button
export const incrementClick = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Find ad and populate campaign
    const ad = await Ad.findById(id).populate("campaign");

    if (!ad) {
      return res.status(404).json({
        success: false,
        message: "Ad not found",
      });
    }

    const campaign = ad.campaign;

    if (!campaign) {
      return res.status(400).json({
        success: false,
        message: "Campaign not linked",
      });
    }

    // Block if campaign not active
    if (campaign.status !== "active") {
      return res.status(400).json({
        success: false,
        message: "Campaign is paused. Click not allowed.",
      });
    }

    // Define CPC
    const CPC = 2;

    // Increment ad clicks
    ad.clicks += 1;

    // Increase campaign spent budget
    campaign.spentBudget += CPC;

    // Auto pause if budget exceeded
    if (campaign.spentBudget >= campaign.totalBudget) {
      campaign.status = "paused";
    }

    // Save both documents
    await ad.save();
    await campaign.save();

    res.status(200).json({
      success: true,
      message: "Click recorded",
      clicks: ad.clicks,
      spentBudget: campaign.spentBudget,
      campaignStatus: campaign.status,
    });

  } catch (error) {
    next(error);
  }
};

// update status in Ad
export const updateAdStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const ad = await Ad.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true },
    );

    if (!ad) {
      return res.status(404).json("Ad not found");
    }
    res.status(200).json(ad);
  } catch (error) {
    next(error);
  }
};

export const getActiveAds = async (req, res, next) => {
  try {
    const ads = await Ad.find({ status: "active" })
      .populate("createdBy", "name avatar") // show publisher info
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: ads.length,
      data: ads,
    });
  } catch (error) {
    next(error);
  }
};

export const getAdById = async (req, res, next) => {
  try {
    const { id } = req.params;
    // validate objectId
    console.log("before update id: ", id);
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Ad Id",
      });
    }
    // increment impression and return updated ad
    const ad = await Ad.findByIdAndUpdate(
      id,
      { $inc: { impressions: 1 } },
      { new: true },
    );
    console.log("update ad: ", ad);

    if (!ad) {
      return res.status(404).json({
        success: false,
        message: "ad not found",
      });
    }
    res.status(200).json({
      success: true,
      data: ad,
    });
  } catch (error) {
    next(error);
  }
};
