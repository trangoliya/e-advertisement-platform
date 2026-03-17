import express from "express";
import { submitFeedback } from "../controllers/feedback.controller.js";
import protect from "../middlewares/auth.middleware.js";

const router = express.Router();

// submit ad feedback
router.post("/ads/:id/feedback", protect, submitFeedback);

export default router;