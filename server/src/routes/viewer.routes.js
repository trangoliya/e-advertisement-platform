import express from "express";
import {
  createOrUpdateProfile,
  getProfile,
  getViewerAds,
} from "../controllers/viewer.controller.js";

import authMiddleware from "../middlewares/auth.middleware.js";
import authorize from "../middlewares/role.middleware.js";

const router = express.Router();

// Create or Update Profile
router.post(
  "/profile",
  authMiddleware,
  authorize("user"),
  createOrUpdateProfile,
);

// Get Profile
router.get("/profile", authMiddleware, authorize("user"), getProfile);

// Get Ads Based on Viewer Targeting
router.get("/ads", authMiddleware, authorize("user"), getViewerAds);

export default router;
