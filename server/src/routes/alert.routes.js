import express from "express";
import { getAlerts, markAlertRead } from "../controllers/alert.controller.js";

import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

// Get User Alerts
router.get("/", authMiddleware, getAlerts);

// Mark Alert As Read
router.patch("/:id/read", authMiddleware, markAlertRead);

export default router;
