import dotenv from "dotenv";

dotenv.config();

const config = {
    MONGO_URI: process.env.MONGO_URI || "",
    RESEND_URI: process.env.RESEND_URI || process.env.RESEND_API_KEY || "",
};

export default config;