import User from "../models/user.model.js";

export const getProfile = async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");

  res.json({
    success: true,
    data: user,
  });
};

export const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // update name
    user.name = req.body.name || user.name;

    // update avatar (if file uploaded)
    if (req.file) {
      user.avatar = `/uploads/${req.file.filename}`;
    }

    await user.save();

    res.json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};