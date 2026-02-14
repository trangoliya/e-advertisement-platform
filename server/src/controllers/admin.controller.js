import User from "../models/user.model.js";
import Ad from "../models/Ad.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password").sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: users.length,
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllAds = async (req, res) => {
  try {
    const ads = await Ad.find().populate("createdBy", "name email role").sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: ads.length,
      data: ads,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateAdStatusByAdmin = async (req, res) => {
  try {
    const { status } = req.body;

    const allowedStatuses = ["active", "paused", "rejected"];
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "invalid status value",
      });
    }

    const ad = await Ad.findById(req.params.id);
    if (!ad) {
      return res.status(404).json({
        success: false,
        message: "Ad not found",
      });
    }

    ad.status = status;
    await ad.save();

    res.status(200).json({
      success: true,
      message: `Ad status updated to ${status}`,
      data: ad,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
