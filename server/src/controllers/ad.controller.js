import Ad from "../models/Ad.js";

// use for create a Ad
export const createAd = async (req, res) => {
  try {
    const { title, description, imageUrl, targetUrl, status } = req.body;
    const ad = await Ad.create({
      title,
      description,
      imageUrl,
      targetUrl,
      status,
      createdBy: req.user._id,
    });

    res.status(201).json({
      success: true,
      data: ad,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// For get Ad
export const getMyAds = async (req, res) => {
  try {
    const ads = await Ad.find({
      createdBy: req.user._id,
    });
    res.status(200).json({
      success: true,
      count: ads.length,
      data: ads,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// increment function for Impression - how many user see your add
export const incrementImpression = async (req, res) => {
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
    res.status(500).json({
      message: "Server error",
    });
  }
};

// increment function for click event - how many user click button
export const incrementClick = async (req, res) => {
  try {
    const ad = await Ad.findByIdAndUpdate(
      req.params._id,
      { $inc: { clicks: 1 } },
      { new: true },
    );

    if (!ad) {
      return res.status(404).json({
        message: "Ad not found",
      });
    }
    res.status(200).json(ad);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};

// update status in Ad
export const updateAdStatus = async (req, res) => {
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
    console.log("status error:", error);
    res.status(500).json({
      message: error.message,
    });
  }
};
