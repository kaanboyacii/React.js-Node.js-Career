import { createError } from "../error/error.js";
import Event from "../models/EventModel.js";
import Company from "../models/CompanyModel.js";

export const createEvent = async (req, res, next) => {
    try {
        const eventData = req.body;
        const companyId = req.user.id;
        const company = await Company.findById(companyId);
        if (!company) {
            return res.status(404).json({ success: false, message: "Company not found!" });
        }
        eventData.company = {
            companyId: company._id,
            companyName: company.name,
        };
        const newEvent = await Event.create(eventData);
        company.events.push(newEvent._id);
        await company.save();
        res.status(201).json(newEvent);
    } catch (err) {
        next(err);
    }
};

export const getEvents = async (req, res, next) => {
    try {
        const events = await Event.find();
        res.status(200).json(events);
    } catch (err) {
        next(err);
    }
};

export const getLatestEvents = async (req, res, next) => {
    try {
        const latestEvents = await Event.find().sort({ datePosted: -1 }).limit(5);
        res.status(200).json(latestEvents);
    } catch (err) {
        next(err);
    }
};

export const getTopApplicantEvents = async (req, res, next) => {
    try {
        const eventsWithTopApplicants = await Event.find()
            .sort({ "applicants.length": -1, datePosted: -1 })
            .limit(5);

        res.status(200).json(eventsWithTopApplicants);
    } catch (err) {
        next(err);
    }
};

export const getEventById = async (req, res, next) => {
    const eventId = req.params.id;
    try {
        const event = await Event.findById(eventId);
        if (event) {
            res.status(200).json(event);
        } else {
            const customError = createError(404, 'Event bulunamadı.');
            res.status(customError.status).json({ error: customError.message });
        }
    } catch (err) {
        next(err);
    }
};

export const getEventsByIds = async (req, res, next) => {
    const eventIds = req.query.ids;
    const idsArray = eventIds.split(',');

    try {
        const events = await Event.find({ _id: { $in: idsArray } });

        if (events.length > 0) {
            res.status(200).json({ eventApplications: events });
        } else {
            const customError = createError(404, 'Etkinlikler bulunamadı.');
            res.status(customError.status).json({ error: customError.message });
        }
    } catch (err) {
        next(err);
    }
}

export const updateEvent = async (req, res, next) => {
    const eventId = req.params.id;
    const updatedEventData = req.body;
    try {
        const updatedEvent = await Event.findByIdAndUpdate(eventId, updatedEventData, { new: true });
        if (updatedEvent) {
            res.status(200).json(updatedEvent);
        } else {
            const customError = createError(404, 'Güncellenen event bulunamadı.');
            res.status(customError.status).json({ error: customError.message });
        }
    } catch (err) {
        next(err);
    }
};

export const deleteEvent = async (req, res, next) => {
    const eventId = req.params.id;
    try {
        const deletedEvent = await Event.findByIdAndDelete(eventId);
        if (deletedEvent) {
            res.status(200).json({ message: 'Event başarıyla silindi.' });
        } else {
            const customError = createError(404, 'Silinen event bulunamadı.');
            res.status(customError.status).json({ error: customError.message });
        }
    } catch (err) {
        next(err);
    }
};

export const getEventsByCompanyId = async (req, res, next) => {
    const companyId = req.params.companyId;
    try {
        const company = await Company.findById(companyId);
        if (!company) {
            const customError = createError(404, 'Şirket bulunamadı.');
            return res.status(customError.status).json({ error: customError.message });
        }
        const events = await Event.find({ 'company.companyId': companyId });

        if (events.length > 0) {
            res.status(200).json(events);
        } else {
            const customError = createError(404, 'Şirkete ait etkinlikler bulunamadı.');
            res.status(customError.status).json({ error: customError.message });
        }
    } catch (err) {
        console.error('Error in getJobsByCompanyId:', err);
        next(err);
    }
};
