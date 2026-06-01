import Ad from "../models/Ad.js";
import mongoose from "mongoose";
import UserAdInteraction from "../models/UserAdInteraction.js";

// Create New Ad
export const createAd = async (req, res, next) => {
  try {
    const { title, description, targetUrl, status, campaignId, template } =
      req.body;

    if (!campaignId) {
      return res.status(400).json({
        success: false,
        message: "Campaign ID is required",
      });
    }

    if (!targetUrl || !targetUrl.startsWith("http")) {
      return res.status(400).json({
        success: false,
        message: "Valid target URL is required (https://...)",
      });
    }

    let mediaUrl = null;
    let mediaType = null;

    if (req.file) {
      mediaUrl = req.file.path;

      if (req.file.mimetype.startsWith("image")) {
        mediaType = "image";
      } else if (req.file.mimetype.startsWith("video")) {
        mediaType = "video";
      }
    }

    const ad = await Ad.create({
      title,
      description,
      targetUrl,
      status,
      campaign: campaignId,
      createdBy: req.user.id,
      mediaUrl,
      mediaType,
      template,
    });

    return res.status(201).json({
      success: true,
      ad,
    });
  } catch (error) {
    next(error);
  }
};
// Get My Ads
export const getMyAds = async (req, res, next) => {
  try {
    const ads = await Ad.find({
      createdBy: req.user.id,
    })
      .populate("createdBy", "name avatar")
      .lean();

    return res.status(200).json({
      success: true,
      count: ads.length,
      data: ads,
    });
  } catch (error) {
    next(error);
  }
};

// Update Ad Status
export const updateAdStatus = async (req, res, next) => {
  try {
    const { status } = req.body;

    const allowedStatuses = ["active", "paused", "draft"];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status",
      });
    }

    const ad = await Ad.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true },
    );

    if (!ad) {
      return res.status(404).json({
        success: false,
        message: "Ad not found",
      });
    }

    return res.status(200).json({
      success: true,
      ad,
    });
  } catch (error) {
    next(error);
  }
};

// Get Active Ads (with basic personalization)
export const getActiveAds = async (req, res, next) => {
  try {
    const userId = req.user?.id;

    let userInterests = [];

    if (userId) {
      const interactions = await UserAdInteraction.find({ userId })
        .populate({
          path: "adId",
          populate: {
            path: "campaign",
          },
        })
        .limit(50)
        .lean();

      const interestMap = {};

      interactions.forEach((item) => {
        const category = item.adId?.campaign?.category;

        if (!category) return;

        interestMap[category] = (interestMap[category] || 0) + 1;
      });

      userInterests = Object.keys(interestMap).sort(
        (a, b) => interestMap[b] - interestMap[a],
      );
    }

    const ads = await Ad.find({
      status: "active",
    })
      .populate("createdBy", "name avatar")
      .populate("campaign")
      .lean();

    ads.sort((a, b) => {
      const aScore = userInterests.includes(a.campaign?.category) ? 1 : 0;

      const bScore = userInterests.includes(b.campaign?.category) ? 1 : 0;

      return bScore - aScore;
    });

    return res.status(200).json({
      success: true,
      count: ads.length,
      data: ads,
    });
  } catch (error) {
    next(error);
  }
};

// Get Ad By ID
export const getAdById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Ad ID",
      });
    }

    const ad = await Ad.findById(id)
      .populate("createdBy", "name avatar")
      .populate("campaign")
      .lean();

    if (!ad) {
      return res.status(404).json({
        success: false,
        message: "Ad not found",
      });
    }

    return res.status(200).json({
      success: true,
      ad,
    });
  } catch (error) {
    next(error);
  }
};

// Track Ad View (Impression)
export const trackAdView = async (req, res, next) => {
  try {
    const { adId } = req.body;

    if (!adId) {
      return res.status(400).json({
        success: false,
        message: "Ad ID is required",
      });
    }

    await Ad.findByIdAndUpdate(adId, {
      $inc: {
        impressions: 1,
      },
    });

    if (req.user?.id) {
      try {
        await UserAdInteraction.create({
          userId: req.user.id,
          adId,
          action: "view",
        });
      } catch {
        // Skip duplicate / analytics errors
      }
    }

    return res.status(200).json({
      success: true,
      message: "View tracked successfully",
    });
  } catch (error) {
    next(error);
  }
};

// Track Ad Click
export const trackAdClick = async (req, res, next) => {
  try {
    const { adId } = req.body;

    if (!adId) {
      return res.status(400).json({
        success: false,
        message: "Ad ID is required",
      });
    }

    const ad = await Ad.findById(adId).populate("campaign");

    if (!ad) {
      return res.status(404).json({
        success: false,
        message: "Ad not found",
      });
    }

    if (!ad.campaign) {
      return res.status(400).json({
        success: false,
        message: "Campaign missing",
      });
    }

    const campaign = ad.campaign;

    if (campaign.status !== "active") {
      return res.status(400).json({
        success: false,
        message: "Campaign paused",
      });
    }

    const CPC = 2;

    if (
      campaign.dailyBudget > 0 &&
      campaign.dailySpent + CPC > campaign.dailyBudget
    ) {
      return res.status(400).json({
        success: false,
        message: "Daily budget exceeded",
      });
    }

    ad.clicks += 1;
    campaign.dailySpent += CPC;
    campaign.spentBudget += CPC;

    if (campaign.spentBudget >= campaign.totalBudget) {
      campaign.status = "paused";
    }

    await ad.save();
    await campaign.save();

    if (req.user?.id) {
      try {
        await UserAdInteraction.create({
          userId: req.user.id,
          adId,
          action: "click",
        });
      } catch {
        // Skip analytics tracking errors
      }
    }

    return res.status(200).json({
      success: true,
      message: "Click tracked successfully",
      clicks: ad.clicks,
    });
  } catch (error) {
    next(error);
  }
};
