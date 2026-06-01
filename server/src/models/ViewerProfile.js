import mongoose from "mongoose";

const viewerProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true, // for unique profile per user
    },
    age: {
      type: Number,
      required: true,
      min: 13,
      max: 100,
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
    interests: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true, // adds createdAt & updatedAt automatically
  },
);

const ViewerProfile = mongoose.model("ViewerProfile", viewerProfileSchema);

export default ViewerProfile;
