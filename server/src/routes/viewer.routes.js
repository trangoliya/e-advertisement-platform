import express from "express";
import {
  createOrUpdateProfile,
  getProfile,
} from "../controllers/viewer.controller.js";

import authMiddleware from "../middlewares/auth.middleware.js";
import authorize from "../middlewares/role.middleware.js"; 

const router = express.Router();

//Create or Update Profile
router.post(
  "/profile",
  authMiddleware,
  authorize("user"),
  createOrUpdateProfile
);

// Get Profile
router.get(
  "/profile",
  authMiddleware,
  authorize("user"),
  getProfile
);

export default router;