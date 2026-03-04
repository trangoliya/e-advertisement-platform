import express from "express";
import { createPublisherProfile, getPublisherProfile } from "../controllers/publisherProfile.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/profile", authMiddleware, createPublisherProfile);
router.get("/profile", authMiddleware, getPublisherProfile);

export default router;