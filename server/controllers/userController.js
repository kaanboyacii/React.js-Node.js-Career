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


export const applyForJob = async (userId, jobId) => {
    try {
        // Kullanıcıyı bul
        const user = await User.findById(userId);

        // İşi bul
        const job = await Job.findById(jobId);

        // Kullanıcının başvurduğu işleri kontrol et (aynı işe birden fazla başvuruyu önlemek için)
        if (user.applications.includes(jobId)) {
            return { success: false, message: 'Zaten bu işe başvurdunuz.' };
        }

        // Kullanıcının başvurduğu işi ekle
        user.applications.push(jobId);

        // İşe başvuran kullanıcıları kontrol et (aynı kullanıcıyı birden fazla işe başvuruyu önlemek için)
        if (job.applicants.includes(userId)) {
            return { success: false, message: 'Bu işe zaten başvuran bir kullanıcı.' };
        }

        // İşe başvuran kullanıcıyı ekle
        job.applicants.push(userId);

        // Veritabanında değişiklikleri kaydet
        await user.save();
        await job.save();

        return { success: true, message: 'İş başvurunuz başarıyla alındı.' };
    } catch (error) {
        console.error('İş başvurusu sırasında bir hata oluştu:', error);
        return { success: false, message: 'İş başvurunuz gerçekleştirilemedi.' };
    }
};

