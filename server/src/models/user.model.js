import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    avatar: {
      type: String,
      default: "",
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    roles: {
      type: [String],
      enum: ["user", "publisher", "admin"],
      default: ["user"],
    },

    profileCompleted: {
      type: Boolean,
      default: false,
    },

    // Publisher Profile
    companyName: {
      type: String,
      default: "",
      trim: true,
    },

    bio: {
      type: String,
      default: "",
      trim: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;