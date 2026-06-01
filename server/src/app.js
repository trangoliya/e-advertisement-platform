import cors from "cors";
import express from "express";
import fs from "fs";

import authRoutes from "./routes/auth.routers.js";
import adRoutes from "./routes/ad.routes.js";
import viewerRoutes from "./routes/viewer.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import userRoutes from "./routes/user.routes.js";
import campaignRoutes from "./routes/campaign.routes.js";
import publisherProfileRoutes from "./routes/publisherProfile.routes.js";
import feedbackRoutes from "./routes/feedback.routes.js";
import alertRoutes from "./routes/alert.routes.js";

import errorHandler from "./middlewares/error.middleware.js";

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

fs.mkdirSync("uploads", { recursive: true });

app.use("/uploads", express.static("uploads"));

app.use("/api/auth", authRoutes);
app.use("/api/ads", adRoutes);
app.use("/api/viewer", viewerRoutes);
app.use("/api/publisher", publisherProfileRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/users", userRoutes);
app.use("/api/alerts", alertRoutes);
app.use("/api", feedbackRoutes);
app.use("/api/campaigns", campaignRoutes);

app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server running",
  });
});

app.use(errorHandler);

export default app;
