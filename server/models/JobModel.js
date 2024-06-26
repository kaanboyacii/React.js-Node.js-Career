import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    company: {
        companyId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Company',
            required: true,
        },
        companyName: {
            type: String,
            required: true,
        },
    },
    description: {
        type: String,
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
    applicants: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        status: {
            type: String,
            enum: ['pending', 'approved', 'rejected'],
            default: 'pending',
        },
    }],
});

export default mongoose.model("Job", jobSchema);
