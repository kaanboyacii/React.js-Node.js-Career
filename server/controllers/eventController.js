import { createError } from "../error/error.js";
import Event from "../models/EventModel.js";

export const createEvent = async (req, res, next) => {
    try {
        const organizerId = req.user.id;
        const eventData = req.body;
        eventData.organizer = organizerId;
        const newEvent = await Event.create(eventData);
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
