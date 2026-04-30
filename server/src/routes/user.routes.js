import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import upload from "../middlewares/uploadMiddleware.js";
import {
  getProfile,
  updateProfile,
} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/profile", authMiddleware, getProfile);

// avatar + name update (multipart/form-data)
router.put(
  "/profile",
  authMiddleware,
  upload.single("avatar"),
  updateProfile
);

export default router;