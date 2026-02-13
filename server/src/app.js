import testRoutes from "./routes/test.routers.js";
import express from "express";
import authRoutes from "./routes/auth.routers.js";
import adRouters from "./routes/ad.routes.js";
import viewerRouters from "./routes/viewer.routes.js";

const app = express();

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/test", testRoutes);
app.use("/api/ads", adRouters);
app.use("/api/viewer", viewerRouters);

//
app.get("/test", (req, res) => {
  res.send("server working");
});
export default app;
