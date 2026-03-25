import mongoose from "mongoose";

const campaignSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
    },

    totalBudget: {
      type: Number,
      required: true,
      min: 0,
    },

    spentBudget: {
      type: Number,
      default: 0,
      min: 0,
    },

    dailyBudget: {
      type: Number,
      default: 0,
      min: 0,
    },

    dailySpent: {
      type: Number,
      default: 0,
      min: 0,
    },

    lastResetDate: {
      type: Date,
      default: Date.now,
    },

    status: {
      type: String,
      enum: ["active", "paused", "completed"],
      default: "active",
    },

    distributionChannels: {
      type: [String],
      enum: ["website", "mobile", "email"],
      default: ["website"],
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Campaign = mongoose.model("Campaign", campaignSchema);

export default Campaign;
