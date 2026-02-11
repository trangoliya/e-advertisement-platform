import express from "express";
import { register, login } from "../controllers/auth.controller.js";

const router = express.Router();

//for  register
router.post("/register", register);

// for login
router.post("/login", login);

export default router;