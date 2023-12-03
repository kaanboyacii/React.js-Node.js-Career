import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./db/connect.js";
import UserRoutes from "./routers/userRoutes.js";
import AuthRoutes from "./routers/authRoutes.js";

const app = express();

dotenv.config();

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", AuthRoutes);
app.use("/api/users", UserRoutes);

app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "Something went wrong !";
    return res.status(status).json({
        success: false,
        status: status,
        message: message,
    });
});

app.listen(8800, () => {
    connectDB();
    console.log("Connected to Server!")
})