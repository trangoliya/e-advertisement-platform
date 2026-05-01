import User from "../models/user.model.js";
import Ad from "../models/Ad.js";

// Get Logged-in User Profile
export const getProfile = async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");

  res.json({
    success: true,
    data: user,
  });
};

// Update Profile (extended fields + avatar)
export const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // BASIC FIELD
    user.name = req.body.name || user.name;

    // NEW PROFILE FIELDS
    user.age = req.body.age ? Number(req.body.age) : user.age;
    user.city = req.body.city || user.city;
    user.interests = req.body.interests || user.interests;

    // PUBLISHER FIELDS
    user.companyName = req.body.companyName || user.companyName;
    user.bio = req.body.bio || user.bio;

    // AVATAR (Cloudinary)
    if (req.file) {
      user.avatar = req.file.path;
      console.log("FILE:", req.file);
    }

    await user.save();

    res.json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Publisher Public Profile
export const getPublisherProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select(
      "name email avatar companyName bio city interests"
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Publisher not found",
      });
    }

    // Get active ads of this publisher
    const ads = await Ad.find({
      createdBy: req.params.id,
      status: "active",
    }).sort({ createdAt: -1 });

    res.json({
      success: true,
      data: {
        user,
        ads,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};