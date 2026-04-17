import mongoose from "mongoose";

const adSchema = new mongoose.Schema(
  {
    title: String,

    description: String,

    mediaUrl: String,

    mediaType: {
      type: String,
      enum: ["image", "video"],
    },

    targetUrl: {
      type: String,
      required: true,
      trim: true,
    },
    
    template: {
      type: String,
      enum: ["standard", "banner", "compact"],
      default: "standard",
    },
    status: {
      type: String,
      enum: ["draft", "active", "paused"],
      default: "active",
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    impressions: {
      type: Number,
      default: 0,
    },

    clicks: {
      type: Number,
      default: 0,
    },

    conversions: {
      type: Number,
      default: 0,
    },

    campaign: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Campaign",
      required: true,
    },
  },
  { timestamps: true },
);

const Ad = mongoose.model("Ad", adSchema);

export default Ad;
