import dotenv from "dotenv";
import { Cors } from "src/types/cors/Cors";
dotenv.config();

export const CORS: Cors = {
    CORS_ORIGIN_PROD: process.env.CORS_ORIGIN_PROD as string,
    CORS_ORIGIN_DEV: process.env.CORS_ORIGIN_DEV as string,
};
