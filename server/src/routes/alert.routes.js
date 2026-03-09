import express from "express";
import { getAlerts, markAlertRead } from "../controllers/alert.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", authMiddleware, getAlerts);
router.patch("/:id/read", authMiddleware, markAlertRead);

export default router;
