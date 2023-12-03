import express from "express";
import cookieParser from "cookie-parser";
import connectDB from "./db/connect.js";
import UserRoutes from "./routers/userRoute.js"

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

app.use("/api/users",UserRoutes);

const PORT = 8800;
connectDB();

app.listen(PORT, () => {
    console.log(`Connected to Server! Listening on port ${PORT}`);
});
