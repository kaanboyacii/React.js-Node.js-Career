import express from "express";
import {
    createJob,
    deleteJob,
    getJobById,
    getJobs,
    updateJob,
    getJobsByIds
} from "../controllers/jobController.js";
import { verifyToken } from "../utility/verifyToken.js";

const router = express.Router();

//create job
router.post("/create", verifyToken, createJob);

//update job
router.put("/:id", verifyToken, updateJob);

//delete job
router.delete("/:id", verifyToken, deleteJob);

//get all jobs
router.get("/getAllJobs", getJobs);

//get job by id
router.get("/:id", getJobById);

//get jobs by ids
router.get("/", getJobsByIds);


export default router;