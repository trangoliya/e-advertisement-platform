import mongoose from "mongoose";

const alertSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  campaignId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Campaign"
  },

  message: {
    type: String,
    required: true
  },

  type: {
    type: String,
    enum: ["info", "warning", "critical"],
    default: "info"
  },

  isRead: {
    type: Boolean,
    default: false
  }

}, { timestamps: true });

export default mongoose.model("Alert", alertSchema);