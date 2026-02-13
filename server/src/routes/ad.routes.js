import express from "express";
import {
  createAd,
  getMyAds,
  incrementClick,
  incrementImpression,
  updateAdStatus,
} from "../controllers/ad.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import roleMiddleware from "../middlewares/role.middleware.js";

const router = express.Router();

// Post&get only when publisher login
router.post("/", authMiddleware, roleMiddleware("publisher"), createAd);
router.get("/my", authMiddleware, roleMiddleware("publisher"), getMyAds);

router.patch(
  "/:id/status",
  authMiddleware,
  roleMiddleware("publisher"),
  updateAdStatus,
);
router.patch(
  "/:id/impression",
  authMiddleware,
  roleMiddleware("publisher"),
  incrementImpression,
);
router.patch(
  "/:id/click",
  authMiddleware,
  roleMiddleware("publisher"),
  incrementClick,
);

export default router;

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
//    "email": "publisher2@gmail.com",   // same as your registraion
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
// [PATCH] - htpp://localhost:5000/api/ads/{_id}/status
// body -> raw -> JSON
// {
//    "status": "active"
// }
