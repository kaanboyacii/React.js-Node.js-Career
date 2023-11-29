import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

const app = express();
dotenv.config();


const connectDB = () => {
    mongoose.set("strictQuery", false);
    mongoose
        .connect(process.env.MONGO)
        .then(() => {
            console.log("Connected to DB")
        })
        .catch((err) => {
            console.error("MongoDB connection error:", err);
            throw err;
        });
}

app.use(express.json());
app.use(cookieParser());


app.use((err, req, res, next)=>{
    const status = err.status || 500;
    const message = err.message || "Something went wrong !";
    return res.status(status).json({
        success:false,
        status:status,
        message:message,
    });
});

app.listen(8800, () => {
    connectDB();
    console.log("Connected to Server!")
})