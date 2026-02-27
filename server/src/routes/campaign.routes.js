import express from "express";
import {
  createCampaign,
  getMyCampaigns,
} from "../controllers/campaign.controller.js";

import authMiddleware from "../middlewares/auth.middleware.js";
import  authorizeRoles  from "../middlewares/role.middleware.js";

const router = express.Router();

// POST /api/campaigns
router.post(
  "/",
  authMiddleware,
  authorizeRoles("publisher"),
  createCampaign
);

// GET /api/campaigns/my
router.get(
  "/my",
  authMiddleware,
  authorizeRoles("publisher"),
  getMyCampaigns
);

export default router;