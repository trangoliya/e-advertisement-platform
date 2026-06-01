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
      select: false,
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

    age: {
      type: Number,
      default: null,
    },

    city: {
      type: String,
      default: "",
    },

    interests: {
      type: String,
      default: "",
    },

    companyName: {
      type: String,
      default: "",
    },

    bio: {
      type: String,
      default: "",
    },
  },
  { timestamps: true },
);
