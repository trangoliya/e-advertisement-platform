import User from "../models/user.model.js";
import Ad from "../models/Ad.js";

// Get Logged-in User Profile
export const getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select("-password").lean();

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};
// Update Profile (extended fields + avatar)
export const updateProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.name = req.body.name || user.name;

    user.age = req.body.age ? Number(req.body.age) : user.age;

    user.city = req.body.city || user.city;

    user.interests = req.body.interests || user.interests;

    user.companyName = req.body.companyName || user.companyName;

    user.bio = req.body.bio || user.bio;

    if (req.file) {
      user.avatar = req.file.path;
    }

    await user.save();

    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

// Publisher Public Profile
export const getPublisherProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id)
      .select("name email avatar companyName bio city interests")
      .lean();

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Publisher not found",
      });
    }

    const ads = await Ad.find({
      createdBy: req.params.id,
      status: "active",
    })
      .sort({ createdAt: -1 })
      .lean();

    return res.status(200).json({
      success: true,
      data: {
        user,
        ads,
      },
    });
  } catch (error) {
    next(error);
  }
};
