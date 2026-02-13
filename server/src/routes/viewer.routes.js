import express from "express";
import {
  getActiveAds,
  getAdById,
  incrementClick,
} from "../controllers/ad.controller.js";

const router = express.Router();

// public router (No authentication need)

router.get("/ads", getActiveAds);
router.get("/ads/:id", getAdById);
router.patch("/ads/:id/click", incrementClick);

export default router;
