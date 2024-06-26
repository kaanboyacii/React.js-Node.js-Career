import express from "express";
import {
    updateUser,
    deleteUser,
    getUser,
    subscribe,
    unsubscribe,
    updateImg,
    applyJob,
    applyEvent,
    checkPassword,
    getUsersByIds
} from "../controllers/userController.js";
import { verifyToken } from "../utility/verifyToken.js";

const router = express.Router();

//update user
router.put("/:id", verifyToken, updateUser);

//check password user
router.post("/check-password/:id", verifyToken, checkPassword);

//update user's image
router.put("/updateImg/:id", verifyToken, updateImg);

//delete user
router.delete("/:id", verifyToken, deleteUser);

//get a user
router.get("/:id", getUser);

//get users by ids
router.get("/", getUsersByIds);

//subscribe a user
router.put("/sub/:id", verifyToken, subscribe);

//unsubscribe a user
router.put("/unsub/:id", verifyToken, unsubscribe);

//apply job
router.post("/apply-job/:jobId", verifyToken, applyJob);

//apply event
router.post("/apply-event/:eventId", verifyToken, applyEvent);


export default router;