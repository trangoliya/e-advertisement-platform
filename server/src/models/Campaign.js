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
      default: "",
      trim: true,
    },

    category: {
      type: String,
      required: true,
      trim: true,
    },

    targeting: {
      ageMin: {
        type: Number,
        default: null,
      },

      ageMax: {
        type: Number,
        default: null,
      },

      locations: {
        type: [String],
        default: [],
      },

      interests: {
        type: [String],
        default: [],
      },
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

    status: {
      type: String,
      enum: ["active", "paused", "completed"],
      default: "active",
    },

    platforms: {
      type: [String],
      enum: [
        "Facebook",
        "Instagram",
        "WhatsApp",
        "LinkedIn",
        "YouTube",
        "Website",
      ],
      default: ["Website"],
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

campaignSchema.index({ createdBy: 1 });
campaignSchema.index({ status: 1 });

const Campaign = mongoose.model("Campaign", campaignSchema);

export default Campaign;
