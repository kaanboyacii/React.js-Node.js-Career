import mongoose from "mongoose";

const CompanySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        industry: {
            type: String,
            required: true,
            trim: true,
        },
        location: {
            type: String,
            required: true,
            trim: true,
        },
        website: {
            type: String,
            trim: true,
        },
        description: {
            type: String,
            required: true,
        },
        contactPerson: {
            type: String,
            required: true,
            trim: true,
        },
        contactEmail: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
        },
        contactPhone: {
            type: String,
            trim: true,
        },
        jobs: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Job',
        }],
    },
    { timestamps: true }
);

export default mongoose.model("Company", CompanySchema);
