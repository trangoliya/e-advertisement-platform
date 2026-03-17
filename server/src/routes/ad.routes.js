import express from "express";
import {
  createAd,
  getActiveAds,
  getMyAds,
  incrementClick,
  incrementImpression,
  updateAdStatus,
  getAdById,
  trackAdView,
  trackAdClick,
} from "../controllers/ad.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import roleMiddleware from "../middlewares/role.middleware.js";
import upload from "../middlewares/uploadMiddleware.js";

const router = express.Router();

// Post&get only when publisher login
router.post("/", authMiddleware, roleMiddleware("publisher"), upload.single("image"), createAd);

router.get("/my-ads", authMiddleware, roleMiddleware("publisher"), getMyAds);
router.patch(
  "/:id/status",
  authMiddleware,
  roleMiddleware("admin"), // better practice
  updateAdStatus,
);

// Impression & click triggered by viewers
router.patch("/:id/impression", incrementImpression);
router.patch("/:id/click", incrementClick);

// Viewer feed
router.get("/active", getActiveAds);

// Get Ad Details
router.get("/:id", getAdById);

router.post("/track-view", authMiddleware, trackAdView);
router.post("/track-click", authMiddleware, trackAdClick);

export default router;
// check in postman
// 1)
// new registration [POST] - http://localhost:5000/api/auth/register
// body -> raw -> JSON
// {
//    "name": "Publisher Test",
//    "email": "publisher2@gmail.com",
//    "password": "123456",
//    "role": "publisher"
// }

// 2)
// for login [POST] - http://localhost:5000/api/auth/login
// body -> raw -> JSON
// {
//    "email": "publisher2@gmail.com",   // same as your registration
//    "password": "123456"
// }
//  copy the token from response.

// 3) set token in postman
// Authorization --> Bearer {token - paste token}

// 4) create new add
// [POST] - http://localhost:5000/api/ads
// body -> raw -> JSON
// {
//    "title": "Test Ad",
//    "description": "Testing",
//    "imageUrl": "https://test.com/img.jpg",
//    "targetUrl": "https://test.com"
// }
// copy _id from this response.

// 5) update status
// [PATCH] - http://localhost:5000/api/ads/{_id}/status
// body -> raw -> JSON
// {
//    "status": "active"
// }
