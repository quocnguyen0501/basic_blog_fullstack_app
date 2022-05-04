import { EMAIL_CONFIGS } from "./EmailConfig";

export const SMTP_TRANSPORT_OPTIONS = {
    service: "gmail",
    auth: {
        user: EMAIL_CONFIGS.GMAIL_ACCOUNT,
        pass: EMAIL_CONFIGS.GMAIL_PASSWORD,
    },
    tls: {
        rejectUnauthorized: false, // avoid NodeJs self signed certificate error
    },
};
