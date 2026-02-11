import express from "express";
import { createAd, getMyAds } from "../controllers/ad.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import roleMiddleware from "../middlewares/role.middleware.js";

const router = express.Router();

// Post&get only login publisher
router.post("/", authMiddleware, roleMiddleware("publisher"), createAd);
router.get("/my", authMiddleware, roleMiddleware("publisher"), getMyAds);

export default router;
