import ViewerProfile from "../models/ViewerProfile.js";
import User from "../models/user.model.js";
import Campaign from "../models/Campaign.js";
import Ad from "../models/Ad.js";

// Create or Update Viewer Profile
export const createOrUpdateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { age, city, interests } = req.body;

    if (!age || !city) {
      return res.status(400).json({
        success: false,
        message: "Age and city are required",
      });
    }

    let profile = await ViewerProfile.findOne({ userId });

    if (profile) {
      profile.age = age;
      profile.city = city;
      profile.interests = interests || [];
      await profile.save();
    } else {
      profile = await ViewerProfile.create({
        userId,
        age,
        city,
        interests: interests || [],
      });
    }

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

// Get Viewer Profile
export const getProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const profile = await ViewerProfile.findOne({ userId }).populate(
      "userId",
      "name email",
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

// Get Ads Based on Viewer Targeting
export const getViewerAds = async (req, res) => {
  try {
    const userId = req.user.id;

    // Fetch viewer profile
    const profile = await ViewerProfile.findOne({ userId });

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Viewer profile not found",
      });
    }
    // Fetch active campaigns
    const campaigns = await Campaign.find({ status: "active" });

    // Targeting matching
    const matchedCampaigns = campaigns.filter((campaign) => {
      const targeting = campaign.targeting || {};

      const ageMatch =
        (!targeting.ageMin || profile.age >= targeting.ageMin) &&
        (!targeting.ageMax || profile.age <= targeting.ageMax);

      const cityMatch =
        !targeting.locations ||
        targeting.locations.length === 0 ||
        targeting.locations.some(
          (loc) => loc.toLowerCase() === profile.city.toLowerCase(),
        );

      const interestMatch =
        !targeting.interests ||
        targeting.interests.length === 0 ||
        profile.interests.some((interest) =>
          targeting.interests.some(
            (target) => target.toLowerCase() === interest.toLowerCase(),
          ),
        );

      return ageMatch && cityMatch && interestMatch;
    });
    // Extract campaign IDs
    const campaignIds = matchedCampaigns.map((c) => c._id);

    // Fetch ads from matched campaigns
    const ads = await Ad.find({
      campaign: { $in: campaignIds },
      status: "active",
    }).populate({ path: "campaign", match: { status: "active" } });
    const filteredAds = ads.filter((ad) => ad.campaign !== null);

    // Return ads
    res.status(200).json({
      success: true,
      ads,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching viewer ads",
      error: error.message,
    });
  }
};
