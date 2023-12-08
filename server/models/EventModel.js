import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    organizer: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    location: {
        type: String,
        required: true,
        trim: true,
    },
    type: {
        type: String,
        required: true,
    },
    capacity: {
        type: Number,
        required: true,
    },
    registrationDeadline: {
        type: Date,
    },
    registrationLink: {
        type: String,
    },
    attendees: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    // İş ilanı özellikleri
    job: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job',
    },
    // Diğer özel özellikler eklenebilir
    customFields: {
        type: mongoose.Schema.Types.Mixed,
    },
    datePosted: {
        type: Date,
        default: Date.now,
    },
    applicants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
});

export default mongoose.model("Event", eventSchema);
