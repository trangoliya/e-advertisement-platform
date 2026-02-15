import express from "express";
import authRoutes from "./routes/auth.routers.js";
import testRoutes from "./routes/test.routers.js";
import adRoutes from "./routes/ad.routes.js";
import viewerRoutes from "./routes/viewer.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import errorHandler from "./middlewares/error.middleware.js";

const app = express();

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/test", testRoutes);
app.use("/api/ads", adRoutes);
app.use("/api/viewer", viewerRoutes);
app.use("/api/admin", adminRoutes);

app.use(errorHandler);

export default app;
