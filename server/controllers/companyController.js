import { createError } from "../error/error.js";
import Company from "../models/CompanyModel.js"
import bcrypt from "bcrypt";

export const updateCompany = async (req, res, next) => {

    if (req.params.id === req.user.id) {
        try {
            if (req.body.password) {
                const salt = bcrypt.genSaltSync(10);
                const hash = bcrypt.hashSync(req.body.password, salt);
                req.body.password = hash;
            }

            const updatedCompany = await Company.findByIdAndUpdate(
                req.params.id,
                {
                    $set: req.body,
                },
                { new: true }
            );

            if (!updatedCompany) {
                return next(createError(404, "Company not found"));
            }

            res.status(200).json(updatedCompany);
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
        const company = await Company.findById(req.params.id);
        if (!company) {
            return next(createError(404, "Company not found!"));
        }
        const updatedCompany = await Company.findByIdAndUpdate(
            req.params.id,
            {
                $set: { img: req.body.img }, 
            },
            {
                new: true,
            }
        );
        res.status(200).json(updatedCompany);
    } catch (err) {
        next(err);
    }
};

export const deleteCompany = async (req, res, next) => {
    if (req.params.id === req.user.id) {
        try {
            const deletedCompany = await Company.findByIdAndDelete(req.params.id);

            if (!deletedCompany) {
                return next(createError(404, "Company not found"));
            }

            res.status(200).json({
                message: "Company has been deleted",
                deletedCompany: deletedCompany
            });

            res.clearCookie("access_token");
        } catch (err) {
            next(err);
        }
    } else {
        return next(createError(403, "You can delete only your account!"));
    }
};

export const getCompany = async (req, res, next) => {
    try {
        const company = await Company.findById(req.params.id);
        res.status(200).json(company);
    } catch (err) {
        next(err)
    }
}
