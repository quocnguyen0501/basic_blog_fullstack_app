import nodemailer from "nodemailer";
import hbs from "nodemailer-express-handlebars";
import { HBS_CONFIGS } from "../../helpers/nodemailer-express-handlebars/HbsConfig";
import { SMTP_TRANSPORT_OPTIONS } from "../../helpers/email/SMTPTransportOptions";

// async..await is not allowed in global scope, must use a wrapper
export const sendEmail = async (
    to: string,
    // html: string,
    resetToken: string,
    userId: number
) => {
    try {
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport(SMTP_TRANSPORT_OPTIONS);

        transporter.use("compile", hbs(HBS_CONFIGS));

        let mail = {
            from: '"Quốc Nguyên 👻" <quocnguyen.forwork@gmail.com>',
            to: to,
            subject: "Change Password",
            template: "ForgotPassword",
            context: {
                resetToken: resetToken,
                userId: userId,
            },
        };

        // send mail with defined transport object
        await transporter.sendMail(mail);
        return true;
    } catch (error) {
        console.log(">>> ERROR SEND EMAIL: ", error);

        return false;
    }
};
