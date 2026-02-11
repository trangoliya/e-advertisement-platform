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
