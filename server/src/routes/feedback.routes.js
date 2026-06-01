import express from "express";
import { submitFeedback } from "../controllers/feedback.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

// Submit Ad Feedback
router.post("/ads/:id/feedback", authMiddleware, submitFeedback);

export default router;
