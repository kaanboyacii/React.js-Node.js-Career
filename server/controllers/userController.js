import { createError } from "../error/error.js";
import User from "../models/UserModel.js"
import Job from "../models/JobModel.js"
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

            res.status(200).json({
                message: "User has been deleted",
                deletedUser: deletedUser
            });

            res.clearCookie("access_token");
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
    const userId = req.user.id; // Veya kullanıcı kimliğini başka bir şekilde alabilirsiniz
    const jobId = req.params.jobId; // Veya iş ilanı kimliğini başka bir şekilde alabilirsiniz

    try {
        // Kullanıcıyı ve iş ilanını kontrol et
        const user = await User.findById(userId);
        const job = await Job.findById(jobId);

        if (!user || !job) {
            const customError = createError(404, 'Kullanıcı veya iş ilanı bulunamadı.');
            return res.status(customError.status).json({ error: customError.message });
        }

        // Kullanıcının başvurduğu iş ilanlarını kontrol et
        if (user.applications.includes(jobId)) {
            const customError = createError(400, 'Bu iş ilanına zaten başvurulmuş.');
            return res.status(customError.status).json({ error: customError.message });
        }

        // Kullanıcının başvurduğu iş ilanlarını güncelle
        user.applications.push(jobId);
        await user.save();

        // İş ilanına başvuran kullanıcıları kontrol et
        if (!job.applicants.find(applicant => applicant.user.toString() === userId)) {
            // İş ilanına daha önce başvurulmamışsa, kullanıcıyı ekleyin
            job.applicants.push({
                user: userId,
                status: 'pending',
            });
            await job.save();
        }

        res.status(200).json({ message: 'İş ilanına başvuru başarılı.' });
    } catch (err) {
        next(err);
    }
};