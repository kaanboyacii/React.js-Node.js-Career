import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    company: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
    },
    requirements: {
        type: [String],
        required: true,
    },
    responsibilities: {
        type: [String],
        required: true,
    },
    location: {
        type: String,
        required: true,
        trim: true,
    },
    level: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    workFrom: {
        type: String,
        required: true,
    },
    salary: {
        type: Number,
    },
    datePosted: {
        type: Date,
        default: Date.now,
    },
});

const JobModel = mongoose.model('Job', jobSchema);

module.exports = JobModel;
