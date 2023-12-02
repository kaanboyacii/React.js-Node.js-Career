import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = () => {
    mongoose.set("strictQuery", false);
    
    mongoose
        .connect(process.env.MONGO)
        .then(() => {
            console.log("Connected to DB");
        })
        .catch((err) => {
            console.error("MongoDB connection error:", err);
            throw err;
        });
};

export default connectDB;
