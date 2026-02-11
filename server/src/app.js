import testRoutes from "./routes/test.routers.js";
import express from "express";
import authRoutes from "./routes/auth.routers.js";
import adRouters from "./routes/ad.routes.js";

const app = express();

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/test", testRoutes);
app.use("/api/ads", adRouters);

export default app;
