import mongoose from "mongoose";

const adSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    mediaUrl: {
      type: String,
      required: true,
    },

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
      required: true,
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
adSchema.index({ createdBy: 1 });
adSchema.index({ campaign: 1 });
adSchema.index({ status: 1 });
export default Ad;
