import express from "express";
import {
  createCampaign,
  getMyCampaigns,
  getCampaignAnalytics,
  exportCampaignAnalytics,
  updateCampaign,
  deleteCampaign,
} from "../controllers/campaign.controller.js";

import authMiddleware from "../middlewares/auth.middleware.js";
import roleMiddleware from "../middlewares/role.middleware.js";

const router = express.Router();

// Create Campaign
router.post("/", authMiddleware, roleMiddleware("publisher"), createCampaign);

// My Campaigns
router.get("/my", authMiddleware, roleMiddleware("publisher"), getMyCampaigns);

// Export Analytics
router.get(
  "/export",
  authMiddleware,
  roleMiddleware("publisher"),
  exportCampaignAnalytics,
);

// Campaign Analytics
router.get(
  "/:id/analytics",
  authMiddleware,
  roleMiddleware("publisher"),
  getCampaignAnalytics,
);

router.put("/:id", authMiddleware, roleMiddleware("publisher"), updateCampaign);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("publisher"),
  deleteCampaign,
);
export default router;
