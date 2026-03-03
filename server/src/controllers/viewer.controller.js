import ViewerProfile from "../models/ViewerProfile.js";
import User from "../models/user.model.js";

// Create or Update - viewer Profile
export const createOrUpdateProfile = async (req, res) => {
  try {
    const userId = req.user.id; // from auth middleware
    const { age, city, interests } = req.body;

    if (!age || !city) {
      return res.status(400).json({
        success: false,
        message: "Age and city are required",
      });
    }

    let profile = await ViewerProfile.findOne({ userId });

    if (profile) {
      // Update existing profile
      profile.age = age;
      profile.city = city;
      profile.interests = interests || [];
      await profile.save();
    } else {
      // Create new profile
      profile = await ViewerProfile.create({
        userId,
        age,
        city,
        interests: interests || [],
      });
    }

    // Mark user profile as completed
    await User.findByIdAndUpdate(userId, {
      profileCompleted: true,
    });

    res.status(200).json({
      success: true,
      message: "Profile saved successfully",
      data: profile,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error saving profile",
      error: error.message,
    });
  }
};

// Get Profile
export const getProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const profile = await ViewerProfile.findOne({ userId }).populate(
      "userId",
      "name email"
    );

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    res.status(200).json({
      success: true,
      data: profile,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching profile",
      error: error.message,
    });
  }
};