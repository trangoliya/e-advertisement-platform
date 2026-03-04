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
    },
    website: {
      type: String,
    },
    category: {
      type: String,
    },
    verified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const PublisherProfile = mongoose.model(
  "PublisherProfile",
  publisherProfileSchema
);

export default PublisherProfile;