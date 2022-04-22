import dotenv from "dotenv";
import { SessionCookieInfo } from "../../types/storage/SessionCookieInfo";

dotenv.config();

export const SESSION_COOKIE_CONFIGS: SessionCookieInfo = {
    COOKIE_NAME: process.env.COOKIE_NAME as string,
    SESSION_SECRET: process.env.SESSION_SECRET_DEV_PROD as string,
};
