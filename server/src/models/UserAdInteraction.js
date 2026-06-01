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
  },
);

userAdInteractionSchema.index({ userId: 1 });
userAdInteractionSchema.index({ adId: 1 });
userAdInteractionSchema.index({ adId: 1, action: 1 });

const UserAdInteraction = mongoose.model(
  "UserAdInteraction",
  userAdInteractionSchema,
);

export default UserAdInteraction;
