import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
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
        fromGoogle: {
            type: Boolean,
            default: false,
        },
        title: {
            type: String,
            required: false,
        },
        bio: {
            type: String,
            required: false,
        },
        birth: {
            type: Date,
            required: false,
        },
        gender: {
            type: String,
            required: false,
        },
        phone: {
            type: String,
            required: false,
        },
        city: {
            type: String,
            required: false,
        },
        drivingLicense: {
            type: String,
            required: false,
        },
        careerLevel: {
            type: String,
            required: false,
        },
        workingStatus: {
            type: String,
            required: false,
        },
        workingWant: {
            type: String,
            required: false,
        },
        skills: {
            type: [
                {
                    title: String,
                    description: String,
                },
            ],
            default: [],
        },
        experience: {
            type: [
                {
                    title: String,
                    company: String,
                    startDate: Date,
                    endDate: Date,
                    description: String,
                },
            ],
            default: [],
        },
        education: {
            type: [
                {
                    institution: String,
                    degree: String,
                    fieldOfStudy: String,
                    startDate: Date,
                    endDate: Date,
                },
            ],
            default: [],
        },
        projects: {
            type: [
                {
                    title: String,
                    description: String,
                    startDate: Date,
                    endDate: Date,
                    skills: [String],
                },
            ],
            default: [],
        },
        certifications: {
            type: [
                {
                    title: String,
                    institution: String,
                    date: Date,
                },
            ],
            default: [],
        },
        applications: {
            type: [String],
            required: false,
        },
        subscribers: {
            type: Number,
            default: 0
        },
        subscribedUsers: {
            type: [String],
        },
    },
    { timestamps: true }
);

export default mongoose.model("User", UserSchema);
