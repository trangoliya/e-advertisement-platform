import Ad from "../models/Ad.js";
import mongoose from "mongoose";

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
    const { id } = req.params;

    const ad = await Ad.findByIdAndUpdate(
      id,
      { $inc: { clicks: 1 } },
      { new: true },
    );
    
    if (!ad) {
      return res.status(404).json({
        success: false,
        message: "Ad not found",
      });
    }
    res.status(200).json({
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

export const getActiveAds = async (req, res) => {
  try {
    const ads = await Ad.find({ status: "active" });

    res.status(200).json({
      success: true,
      count: ads.length,
      data: ads,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "server error",
    });
  }
};

export const getAdById = async (req, res) => {
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
      return res.status(404).js({
        success: false,
        message: "ad not found",
      });
    }
    res.status(200).json({
      success: true,
      data: ad,
    });
  } catch (error) {
    console.error("getAdById Error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
