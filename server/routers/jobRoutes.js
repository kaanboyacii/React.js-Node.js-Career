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

//get all jobs
router.get("/getAllJobs", verifyToken, getJobs);

//get job by id
router.get("/:id", verifyToken, getJobById);

//update job
router.put("/:id", verifyToken, updateJob);

//delete job
router.delete("/:id", verifyToken, deleteJob);



export default router;