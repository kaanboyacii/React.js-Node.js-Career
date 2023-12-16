import express from "express";
import {
    updateCompany,
    deleteCompany,
    getCompany,
    updateImg,
} from "../controllers/companyController.js";
import { verifyToken } from "../utility/verifyToken.js";

const router = express.Router();

//update Company
router.put("/:id", verifyToken, updateCompany);

//update Company's image
router.put("/updateImg/:id", verifyToken, updateImg);

//delete Company
router.delete("/:id", verifyToken, deleteCompany);

//get a Company
router.get("/find/:id", getCompany);


export default router;