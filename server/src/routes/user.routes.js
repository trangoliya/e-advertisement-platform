import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import upload from "../middlewares/uploadMiddleware.js";

import {
  getProfile,
  updateProfile,
  getPublisherProfile,
} from "../controllers/user.controller.js";

const router = express.Router();

// Logged-in User Profile
router.get("/profile", authMiddleware, getProfile);

// Update Profile
router.put("/profile", authMiddleware, upload.single("avatar"), updateProfile);

// Public Publisher Profile
router.get("/publisher/:id", getPublisherProfile);

export default router;
