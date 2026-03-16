import mongoose from "mongoose";

const userAdInteractionSchema = new mongoose.Schema(
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

    action: {
      type: String,
      enum: ["view", "click"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const UserAdInteraction = mongoose.model(
  "UserAdInteraction",
  userAdInteractionSchema
);

export default UserAdInteraction;