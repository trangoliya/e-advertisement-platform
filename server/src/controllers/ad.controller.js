import Ad from "../models/Ad.js";
import mongoose from "mongoose";
import Campaign from "../models/Campaign.js";
import Alert from "../models/Alert.js";
import UserAdInteraction from "../models/UserAdInteraction.js";

// use for create a Ad
export const createAd = async (req, res, next) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);
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
      publisher: req.user.id,
      targetUrl,
      status,
      campaign: campaignId,
      createdBy: req.user.id,
      mediaUrl,
      mediaType,
      template,
    });

    res.status(201).json({
      success: true,
      ad,
    });
  } catch (error) {
    console.error("CREATE AD ERROR:", error); 
    next(error);
  }
};
// For get Ad
export const getMyAds = async (req, res, next) => {
  try {
    const ads = await Ad.find({
      createdBy: req.user.id,
    }).populate("createdBy", "name avatar");
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
    const userId = req.user?.id;

    let userInterests = [];

    if (userId) {
      const interactions = await UserAdInteraction.find({ userId })
        .populate({
          path: "adId",
          populate: { path: "campaign" },
        })
        .limit(50);

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

    const ads = await Ad.find({ status: "active" })
      .populate("createdBy", "name avatar")
      .populate("campaign")
      .lean();

    ads.sort((a, b) => {
      const aScore = userInterests.includes(a.campaign?.category) ? 1 : 0;
      const bScore = userInterests.includes(b.campaign?.category) ? 1 : 0;

      return bScore - aScore;
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
      ad,
    });
  } catch (error) {
    next(error);
  }
};

export const trackAdView = async (req, res) => {
  try {
    const { adId } = req.body;

    if (!adId) {
      return res.status(400).json({
        success: false,
        message: "Ad ID required",
      });
    }

    await Ad.findByIdAndUpdate(adId, {
      $inc: { impressions: 1 },
    });

    if (req.user?.id) {
      try {
        await UserAdInteraction.create({
          userId: req.user.id,
          adId,
          action: "view",
        });
      } catch (err) {
        console.warn("View tracking skipped");
      }
    }

    return res.status(200).json({
      success: true,
      message: "View tracked",
    });
  } catch (error) {
    console.error("🔥 TRACK VIEW ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const trackAdClick = async (req, res) => {
  try {
    console.log("BODY:", req.body);

    const { adId } = req.body;

    //validate input
    if (!adId) {
      return res.status(400).json({
        success: false,
        message: "Ad ID required",
      });
    }

    // find ad + campaign
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

    // campaign must be active
    if (campaign.status !== "active") {
      return res.status(400).json({
        success: false,
        message: "Campaign paused",
      });
    }

    const CPC = 2;

    // budget check
    if (
      campaign.dailyBudget > 0 &&
      campaign.dailySpent + CPC > campaign.dailyBudget
    ) {
      return res.status(400).json({
        success: false,
        message: "Daily budget exceeded",
      });
    }

    // update values
    ad.clicks += 1;
    campaign.dailySpent += CPC;
    campaign.spentBudget += CPC;

    // auto pause
    if (campaign.spentBudget >= campaign.totalBudget) {
      campaign.status = "paused";
    }

    await ad.save();
    await campaign.save();

    // SAFE tracking (no crash)
    if (req.user?.id) {
      try {
        await UserAdInteraction.create({
          userId: req.user.id,
          adId,
          action: "click",
        });
      } catch (err) {
        console.warn("User tracking skipped");
      }
    }

    return res.status(200).json({
      success: true,
      message: "Click tracked successfully",
      clicks: ad.clicks,
    });
  } catch (error) {
    console.error(" TRACK CLICK ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
