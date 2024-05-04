import express from "express";
import {
    createJob,
    deleteJob,
    getJobById,
    getJobs,
    updateJob,
    getJobsByIds,
    searchJobsByName
} from "../controllers/jobController.js";
import { verifyToken } from "../utility/verifyToken.js";

const router = express.Router();

//create job
router.post("/", verifyToken, createJob);

//update job
router.put("/:id", verifyToken, updateJob);

//delete job
router.delete("/:id", verifyToken, deleteJob);

//get all jobs
router.get("/getAllJobs", getJobs);

//get search jobs by name
router.get("/search", searchJobsByName);

//get job by id
router.get("/:id", getJobById);

//get jobs by ids
router.get("/", getJobsByIds);


export default router;