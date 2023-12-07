import { createError } from "../error/error.js";
import Job from "../models/JobModel.js";

export const createJob = async (req, res, next) => {
    try {
        const jobData = req.body;
        const newJob = await Job.create(jobData);
        res.status(201).json(newJob);
    } catch (err) {
        next(err);
    }
};

export const getJobs = async (req, res, next) => {
    try {
        const jobs = await Job.find();
        res.status(200).json(jobs);
    } catch (err) {
        next(err);
    }
};

export const getJobById = async (req, res, next) => {
    const jobId = req.params.id;
    try {
        const job = await Job.findById(jobId);
        if (job) {
            res.status(200).json(job);
        } else {
            const customError = createError(404, 'İş bulunamadı.');
            res.status(customError.status).json({ error: customError.message });
        }
    } catch (err) {
        next(err);
    }
};

export const updateJob = async (req, res, next) => {
    const jobId = req.params.id;
    const updatedJobData = req.body;
    try {
        const updatedJob = await Job.findByIdAndUpdate(jobId, updatedJobData, { new: true });
        if (updatedJob) {
            res.status(200).json(updatedJob);
        } else {
            const customError = createError(404, 'Güncellenen iş bulunamadı.');
            res.status(customError.status).json({ error: customError.message });
        }
    } catch (err) {
        next(err);
    }
};

export const deleteJob = async (req, res, next) => {
    const jobId = req.params.id;
    try {
        const deletedJob = await Job.findByIdAndDelete(jobId);
        if (deletedJob) {
            res.status(200).json({ message: 'İş başarıyla silindi.' });
        } else {
            const customError = createError(404, 'Silinen iş bulunamadı.');
            res.status(customError.status).json({ error: customError.message });
        }
    } catch (err) {
        next(err);
    }
};
