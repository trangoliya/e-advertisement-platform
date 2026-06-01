import express from "express";
import {
  createAd,
  getActiveAds,
  getMyAds,
  updateAdStatus,
  getAdById,
  trackAdView,
  trackAdClick,
} from "../controllers/ad.controller.js";

import authMiddleware from "../middlewares/auth.middleware.js";
import roleMiddleware from "../middlewares/role.middleware.js";
import upload from "../middlewares/uploadMiddleware.js";

const router = express.Router();

// Create Ad
router.post(
  "/",
  authMiddleware,
  roleMiddleware("publisher"),
  upload.single("media"),
  createAd
);

// My Ads
router.get(
  "/my-ads",
  authMiddleware,
  roleMiddleware("publisher"),
  getMyAds
);

// Change Ad Status
router.patch(
  "/:id/status",
  authMiddleware,
  roleMiddleware("publisher", "admin"),
  updateAdStatus
);

// Active Ads Feed
router.get("/active", getActiveAds);

// Ad Details
router.get("/:id", getAdById);

// Analytics Tracking
router.post(
  "/track-view",
  authMiddleware,
  trackAdView
);

router.post(
  "/track-click",
  authMiddleware,
  trackAdClick
);

export default router;