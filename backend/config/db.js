import mongoose from 'mongoose';
import config from './config.js';

let isConnected = false;

async function connectDB() {
    if (!config.MONGO_URI) {
        return false;
    }

    if (isConnected || mongoose.connection.readyState >= 1) {
        return true;
    }

    try {
        await mongoose.connect(config.MONGO_URI);
        isConnected = true;
        console.log("Connected to MongoDB");
        return true;
    } catch (error) {
        console.error("MongoDB connection error:", error.message);
        return false;
    }
}

export default connectDB;