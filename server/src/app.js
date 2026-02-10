import testRoutes from "./routes/test.routers.js";
import express from "express";
import authRoutes from "./routes/auth.router.js";

const app = express();

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/test", testRoutes);

export default app;
