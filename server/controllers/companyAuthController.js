import Company from "../models/CompanyModel.js";
import bcrypt from "bcrypt";
import { createError } from "../error/error.js";
import jwt from "jsonwebtoken";

export const companySignup = async (req, res, next) => {
    try {
        const existingCompany = await Company.findOne({ email: req.body.email });
        if (existingCompany) {
            return res.status(400).send("Bu e-posta adresi zaten kullanılıyor.");
        }
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        const newCompany = new Company({ ...req.body, password: hash });
        await newCompany.save();

        res.status(200).json({
            CompanyId: newCompany._id,
            email: newCompany.email,
        });
    } catch (err) {
        next(err);
    }
}

export const companySignin = async (req, res, next) => {
    try {
        const company = await Company.findOne({ email: req.body.email });
        if (!company) return next(createError(404, "Company not found!"));

        const isCorrect = await bcrypt.compare(req.body.password, company.password);
        if (!isCorrect) return next(createError(400, "Wrong credentials!"));

        const token = jwt.sign({ id: company._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        const { password, ...others } = company._doc;

        res.cookie("access_token", token, {
            httpOnly: true,
            ecure: true,
        }).status(200).json({
            success: true,
            message: "Company login successful!",
            token,
            company: others
        });

    } catch (err) {
        next(err);
    }
}

export const companyLogout = async (req, res, next) => {
    try {
        const token = req.cookies.access_token;
        if (!token) {
            return res.status(401).json({ message: 'Access token missing' });
        }
        res.cookie("access_token", "", { expires: new Date(0), httpOnly: true });
        return res.status(200).json({ message: 'Successfully logged out' });
    } catch (err) {
        next(err);
    }
};