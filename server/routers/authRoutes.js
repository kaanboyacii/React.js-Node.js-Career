import express from "express";
import { googleAuth, logout, signin, signup } from "../controllers/authController.js";

const router = express.Router();

//Sign up
router.post("/signup",signup)

//Sign in
router.post("/login",signin)

//Sign in
router.post("/logout",logout)

//Google auth
router.post("/google", googleAuth)

export default router;