import express from "express";
import {
  getAllAds,
  getAllUsers,
  updateAdStatusByAdmin,
} from "../controllers/admin.controller.js";

import protect from "../middlewares/auth.middleware.js";
import roleMiddleware from "../middlewares/role.middleware.js";

const router = express.Router();

router.use(protect, roleMiddleware("admin"));

// get all user and ads
router.get("/users", getAllUsers);
router.get("/ads", getAllAds);

// PATCH ad status
router.patch("/ads/:id/status", updateAdStatusByAdmin);

export default router;
