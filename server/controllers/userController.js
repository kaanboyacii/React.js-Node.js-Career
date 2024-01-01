import { createError } from "../error/error.js";
import User from "../models/UserModel.js"
import Job from "../models/JobModel.js"
import Event from "../models/EventModel.js";
import bcrypt from "bcrypt";

export const updateUser = async (req, res, next) => {
    if (req.params.id === req.user.id) {
        try {
            if (req.body.password) {
                const salt = bcrypt.genSaltSync(10);
                const hash = bcrypt.hashSync(req.body.password, salt);
                req.body.password = hash;
            }

            const updatedUser = await User.findByIdAndUpdate(
                req.params.id,
                {
                    $set: req.body,
                },
                { new: true }
            );

            if (!updatedUser) {
                return next(createError(404, "User not found"));
            }

            res.status(200).json(updatedUser);
        } catch (err) {
            if (err.name === 'MongoError' && err.code === 11000) {
                return next(createError(409, 'Email is already in use'));
            }
            next(err);
        }
    } else {
        return next(createError(403, "You can update only your account!"));
    }
};

export const checkPassword = async (req, res, next) => {
    try {
        const userId = req.params.id;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const isPasswordCorrect = await bcrypt.compare(req.body.oldPassword, user.password);
        if (isPasswordCorrect) {
            return res.status(200).json({ success: true, message: "Password is correct" });
        } else {
            return res.status(403).json({ success: false, message: "Incorrect password" });
        }
    } catch (error) {
        next(error);
    }
};

export const updateImg = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return next(createError(404, "User not found!"));
        }
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                $set: { img: req.body.img }, // update the user's img field with the new value
            },
            {
                new: true,
            }
        );
        res.status(200).json(updatedUser);
    } catch (err) {
        next(err);
    }
};

export const deleteUser = async (req, res, next) => {
    if (req.params.id === req.user.id) {
        try {
            const deletedUser = await User.findByIdAndDelete(req.params.id);
            if (!deletedUser) {
                return next(createError(404, "User not found"));
            }
            res.clearCookie("access_token");
            res.status(200).json({
                message: "User has been deleted",
                deletedUser: deletedUser
            });
        } catch (err) {
            next(err);
        }
    } else {
        return next(createError(403, "You can delete only your account!"));
    }
};

export const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
    } catch (err) {
        next(err)
    }
}

export const subscribe = async (req, res, next) => {
    try {
        await User.findByIdAndUpdate(req.user.id, {
            $push: { subscribedUsers: req.params.id },
        });
        await User.findByIdAndUpdate(req.params.id, {
            $inc: { subscribers: 1 },
        });
        res.status(200).json("Subscription successfull.")
    } catch (err) {
        next(err);
    }
};

export const unsubscribe = async (req, res, next) => {
    try {
        try {
            await User.findByIdAndUpdate(req.user.id, {
                $pull: { subscribedUsers: req.params.id },
            });
            await User.findByIdAndUpdate(req.params.id, {
                $inc: { subscribers: -1 },
            });
            res.status(200).json("Unsubscription successfull.")
        } catch (err) {
            next(err);
        }
    } catch (err) {
        next(err);
    }
};

export const applyJob = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const jobId = req.params.jobId;
        const user = await User.findById(userId);
        if (!user) {
            return next(createError(404, "User not found!"));
        }
        const job = await Job.findById(jobId);
        if (!job) {
            return next(createError(404, "Job not found!"));
        }
        // Kullanıcının daha önce bu işe başvurup başvurmadığını kontrol eder
        const isApplied = user.jobApplications.some((application) => application.equals(jobId));
        if (isApplied) {
            return res.status(400).json({ success: false, message: "You have already applied for this job." });
        }
        // Kullanıcının başvurularına iş ilanını eklenir
        user.jobApplications.push(jobId);
        await user.save();
        // İş ilanına başvurulara kullanıcıyı eklenir
        job.applicants.push({ user: userId, status: "pending" });
        await job.save();
        res.status(200).json({ success: true, message: "Job application successful!" });
    } catch (err) {
        next(err);
    }
};

export const applyEvent = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const eventId = req.params.eventId;

        const user = await User.findById(userId);
        if (!user) {
            return next(createError(404, "User not found!"));
        }

        const event = await Event.findById(eventId);
        if (!event) {
            return next(createError(404, "Event not found!"));
        }

        const isApplied = user.eventApplications.some((application) => application.equals(eventId));
        if (isApplied) {
            return res.status(400).json({ success: false, message: "You have already applied for this event." });
        }

        user.eventApplications.push(eventId);
        await user.save();

        event.applicants.push({ user: userId, status: "pending" });
        await event.save();

        res.status(200).json({ success: true, message: "Event application successful!" });
    } catch (err) {
        next(err);
    }
};