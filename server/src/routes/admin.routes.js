import express from "express";
import {
  getAllAds,
  getAllUsers,
  updateAdStatusByAdmin,
} from "../controllers/admin.controller.js";

import authMiddleware from "../middlewares/auth.middleware.js";
import roleMiddleware from "../middlewares/role.middleware.js";

const router = express.Router();

// Admin Only Routes
router.use(
  authMiddleware,
  roleMiddleware("admin")
);

// Users
router.get("/users", getAllUsers);

// Ads
router.get("/ads", getAllAds);

// Update Ad Status
router.patch(
  "/ads/:id/status",
  updateAdStatusByAdmin
);

export default router;