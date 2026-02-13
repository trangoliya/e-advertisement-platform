import mongoose from "mongoose";

const adSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    imageUrl: String,
    targerUrl: String,
    status: {
      type: String,
      enum: ["draft", "active", "paused"],
      default: "draft",
    },

    createBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },

    impressions: {
      type: Number,
      default: 0,
    },

    clicks: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

const Ad = mongoose.model("Ad", adSchema);

export default Ad;
