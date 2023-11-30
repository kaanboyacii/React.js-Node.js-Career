import express from "express";
import cookieParser from "cookie-parser";
import connectDB from "./db/connect.js";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "Something went wrong!";
    return res.status(status).json({
        success: false,
        status: status,
        message: message,
    });
});

const PORT = 8800;

// Call connectDB from connect.js
connectDB();

app.listen(PORT, () => {
    console.log(`Connected to Server! Listening on port ${PORT}`);
});
