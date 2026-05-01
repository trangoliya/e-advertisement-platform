import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import upload from "../middlewares/uploadMiddleware.js";
import {
  getProfile,
  updateProfile,
  getPublisherProfile,
} from "../controllers/user.controller.js";

const router = express.Router();

// Logged-in user profile
router.get("/profile", authMiddleware, getProfile);

// avatar + name + company + bio update
router.put(
  "/profile",
  authMiddleware,
  upload.single("avatar"),
  updateProfile
);

// Public Publisher Profile (NO AUTH needed)
router.get("/publisher/:id", getPublisherProfile);

export default router;