import mongoose from "mongoose";

const publisherProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    businessName: {
      type: String,
      required: true,
      trim: true,
    },

    website: {
      type: String,
      trim: true,
    },

    category: {
      type: String,
      trim: true,
    },

    verified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Performance Index
publisherProfileSchema.index({ userId: 1 });

const PublisherProfile = mongoose.model(
  "PublisherProfile",
  publisherProfileSchema
);

export default PublisherProfile;