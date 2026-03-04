import PublisherProfile from "../models/publisherProfile.model.js";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const createPublisherProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { businessName, website, category } = req.body;

    const existing = await PublisherProfile.findOne({ userId });

    if (existing) {
      return res.status(400).json({
        message: "Publisher profile already exists",
      });
    }

    const profile = await PublisherProfile.create({
      userId,
      businessName,
      website,
      category,
    });

    const user = await User.findByIdAndUpdate(
      userId,
      { role: "publisher" },
      { new: true }
    );

    //generate new token with updated role
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(201).json({
      message: "Publisher profile created",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {
    res.status(500).json({
      message: "Error creating publisher profile",
      error: error.message,
    });
  }
};
export const getPublisherProfile = async (req, res) => {
  try {
    const profile = await PublisherProfile.findOne({
      userId: req.user.id,
    });

    res.status(200).json({
      isPublisher: !!profile,
      profile,
    });

  } catch (error) {
    res.status(500).json({
      message: "Error fetching publisher profile",
      error: error.message,
    });
  }
};