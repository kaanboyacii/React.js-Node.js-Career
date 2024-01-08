import express from "express";
import {
    updateCompany,
    deleteCompany,
    getCompany,
    updateImg,
    getCompanies
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
router.get("/:id", getCompany);

//get all Companies
router.get("/", getCompanies);


export default router;