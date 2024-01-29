import { createError } from "../error/error.js";
import Job from "../models/JobModel.js";
import Company from "../models/CompanyModel.js";

export const createJob = async (req, res, next) => {
    try {
        const jobData = req.body;
        const companyId = req.user.id;
        const company = await Company.findById(companyId);
        if (!company) {
            return res.status(404).json({ success: false, message: "Company not found!" });
        }
        jobData.company = {
            companyId: company._id,
            companyName: company.name,
        };
        const newJob = await Job.create(jobData);
        company.jobs.push(newJob._id);
        await company.save();

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

export const getJobsByIds = async (req, res, next) => {
    const jobIds = req.query.ids; // Assuming the IDs are passed as a query parameter, e.g., /api/jobs?ids=id1,id2,id3
    const idsArray = jobIds.split(',');

    try {
        const jobs = await Job.find({ _id: { $in: idsArray } });

        if (jobs.length > 0) {
            res.status(200).json({ jobApplications: jobs });
        } else {
            const customError = createError(404, 'İşler bulunamadı.');
            res.status(customError.status).json({ error: customError.message });
        }
    } catch (err) {
        next(err);
    }
};

export const searchJobsByName = async (req, res, next) => {
    const { title } = req.query;

    try {
        const jobs = await Job.find({ "title": { $regex: new RegExp(title, "i") } });

        if (jobs.length > 0) {
            res.status(200).json(jobs);
        } else {
            console.log(`No jobs found with title: ${title}`);
            const customError = createError(404, 'İşler bulunamadı.');
            res.status(customError.status).json({ error: customError.message });
        }
    } catch (err) {
        console.error('Error in searchJobsByName:', err);
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
