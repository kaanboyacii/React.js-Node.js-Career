import express from "express";
import {
    createJob,
    deleteJob,
    getJobById,
    getJobs,
    updateJob
} from "../controllers/jobController.js";
import { verifyToken } from "../utilities/verifyToken.js";

const router = express.Router();

//create job
router.post("/create", verifyToken, createJob);


export default router;