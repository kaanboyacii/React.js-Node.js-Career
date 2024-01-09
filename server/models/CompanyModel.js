import mongoose from "mongoose";

const CompanySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
    },
    img: {
        type: String,
        required: false,
    },
    industry: {
        type: String,
        trim: true,
    },
    location: {
        type: String,
        trim: true,
    },
    website: {
        type: String,
        trim: true,
    },
    description: {
        type: String,
    },
    contactPerson: {
        type: String,
        trim: true,
    },
    contactEmail: {
        type: String,
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
    events: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
    }],
},
    { timestamps: true }
);

export default mongoose.model("Company", CompanySchema);
