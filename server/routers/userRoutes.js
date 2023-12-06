import express from "express";
import {
    update,
    deleteUser,
    getUser,
    subscribe,
    unsubscribe,
    updateImg,
    applyForJob
} from "../controllers/userController.js";
import { verifyToken } from "../utilities/verifyToken.js";

const router = express.Router();

//update user
router.put("/:id", verifyToken, update);

//update user's image
router.put("/updateImg/:id", verifyToken, updateImg);

//delete user
router.delete("/:id", verifyToken, deleteUser);

//get a user
router.get("/find/:id", getUser);

//subscribe a user
router.put("/sub/:id", verifyToken, subscribe);

//unsubscribe a user
router.put("/unsub/:id", verifyToken, unsubscribe);

//apply job
router.put("/apply-job/:id", verifyToken, applyForJob);


export default router;