import express from "express";
import { googleAuth, logout, signin, signup } from "../controllers/authController.js";
import { companySignin, companySignup, companyLogout } from "../controllers/companyAuthController.js";

const router = express.Router();
//USER AUTH
//Sign up
router.post("/signup", signup)
//Sign in
router.post("/login", signin)
//Logout
router.post("/logout", logout)
//Google auth
router.post("/google", googleAuth)

//COMPANY AUTH
//Sign up
router.post("/company-signup", companySignup)
//Sign in
router.post("/company-login", companySignin)
//Logout
router.post("/company-logout", companyLogout)

export default router;