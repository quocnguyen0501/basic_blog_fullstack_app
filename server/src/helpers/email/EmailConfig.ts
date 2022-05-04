import dotenv from "dotenv";
import { EmailInfo } from "src/types/email/EmailInfo";

dotenv.config();

export const EMAIL_CONFIGS: EmailInfo = {
    GMAIL_ACCOUNT: process.env.GMAIL_ACCOUNT as string,
    GMAIL_PASSWORD: process.env.GMAIL_PASSWORD as string,
};
