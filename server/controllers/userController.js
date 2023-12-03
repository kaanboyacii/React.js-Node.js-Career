import { createError } from "../error/error.js";
import User from "../models/UserModel.js"
import bcrypt from "bcrypt";

export const update = async (req, res, next) => {
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
            res.status(200).json(deletedUser);
            res.status(200).json("User has been deleted");
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