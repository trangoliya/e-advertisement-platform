import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./config/db.js";


dotenv.config();

console.log("PORT:", process.env.PORT);
console.log("JWT_SECRET:", process.env.JWT_SECRET);
console.log("CLOUD:", process.env.CLOUDINARY_CLOUD_NAME);
console.log("API KEY:", process.env.CLOUDINARY_API_KEY);

// DB connect
connectDB();

const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});