import cors from "cors";
import express from "express";
import authRoutes from "./routes/auth.routers.js";
import testRoutes from "./routes/test.routers.js";
import adRoutes from "./routes/ad.routes.js";
import viewerRoutes from "./routes/viewer.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import errorHandler from "./middlewares/error.middleware.js";
import userRoutes from "./routes/user.routes.js";
import campaignRoutes from "./routes/campaign.routes.js";
import publisherProfileRoutes from "./routes/publisherProfile.routes.js";
import feedbackRoutes from "./routes/feedback.routes.js";
import alertRoutes from "./routes/alert.routes.js";
import fs from "fs";

const app = express();
app.use(
  cors({
    origin: "https://e-advertisement-platform.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    credentials: true,
  }),
);
if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/test", testRoutes);
app.use("/api/ads", adRoutes);
app.use("/api/viewer", viewerRoutes);
app.use("/api/publisher", publisherProfileRoutes);
app.use("/uploads", express.static("uploads"));
app.use("/api/admin", adminRoutes);
app.use("/api/users", userRoutes);
app.use("/api/alerts", alertRoutes);
app.use("/api", feedbackRoutes);
app.use("/api/campaigns", campaignRoutes);
app.get("/test", (req, res) => {
  res.send("Server working");
});

app.use(errorHandler);

export default app;
