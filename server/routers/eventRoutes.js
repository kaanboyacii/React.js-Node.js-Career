import express from "express";
import {
    createEvent,
    deleteEvent,
    getEventById,
    getEvents,
    updateEvent,
    getTopApplicantEvents,
    getLatestEvents
} from "../controllers/eventController.js";
import { verifyToken } from "../utility/verifyToken.js";

const router = express.Router();

//create event
router.post("/create", verifyToken, createEvent);

//update event
router.put("/:id", verifyToken, updateEvent);

//delete event
router.delete("/:id", verifyToken, deleteEvent);

//get all events
router.get("/getAllEvents", getEvents);

//get top applicant events
router.get("/getTopApplicantEvents", getTopApplicantEvents);

//get latest events
router.get("/getLatestEvents", getLatestEvents);

//get event by id
router.get("/:id", getEventById);


export default router;