import jwt from "jsonwebtoken";
import { createError } from "../error/error.js";

export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) {
        return next(createError(401, "Access token is missing!"));
    }


    jwt.verify(token, process.env.JWT, (err, user) => {
        if (!process.env.JWT) {
            return next(createError(500, "JWT secret key is missing!"));
        }

        if (err) return next(createError(403, "Token is not valid!"));
        req.user = user;
        next()
    });
};