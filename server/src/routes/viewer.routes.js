import express from "express";

import {
  createOrUpdateProfile,
  getProfile,
  getViewerAds,
} from "../controllers/viewer.controller.js";

import authMiddleware from "../middlewares/auth.middleware.js";
import roleMiddleware from "../middlewares/role.middleware.js";

const router = express.Router();

// Create or Update Viewer Profile
router.post(
  "/profile",
  authMiddleware,
  roleMiddleware("user"),
  createOrUpdateProfile,
);

// Get Viewer Profile
router.get("/profile", authMiddleware, roleMiddleware("user"), getProfile);

// Get Personalized Ads
router.get("/ads", authMiddleware, roleMiddleware("user"), getViewerAds);

export default router;
