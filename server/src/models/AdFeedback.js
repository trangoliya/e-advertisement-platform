import mongoose from "mongoose";

const adFeedbackSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    adId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ad",
      required: true,
    },
    response: {
      type: String,
      enum: ["yes", "no"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// ensure one feedback per user per ad
adFeedbackSchema.index({ userId: 1, adId: 1 }, { unique: true });

const AdFeedback = mongoose.model("AdFeedback", adFeedbackSchema);

export default AdFeedback;