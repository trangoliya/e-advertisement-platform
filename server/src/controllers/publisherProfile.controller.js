import PublisherProfile from "../models/publisherProfile.model.js";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const createPublisherProfile = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const { businessName, website, category } = req.body;

    if (!businessName) {
      return res.status(400).json({
        success: false,
        message: "Business name is required",
      });
    }

    const existing = await PublisherProfile.findOne({
      userId,
    });

    if (existing) {
      return res.status(400).json({
        success: false,
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
      {
        $addToSet: {
          roles: "publisher",
        },
      },
      {
        new: true,
      },
    );

    const token = jwt.sign(
      {
        id: user._id,
        roles: user.roles,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      },
    );

    return res.status(201).json({
      success: true,
      message: "Publisher profile created",
      token,
      user,
      profile,
    });
  } catch (error) {
    next(error);
  }
};

export const getPublisherProfile = async (req, res, next) => {
  try {
    const profile = await PublisherProfile.findOne({
      userId: req.user.id,
    }).lean();

    return res.status(200).json({
      success: true,
      isPublisher: !!profile,
      profile,
    });
  } catch (error) {
    next(error);
  }
};
