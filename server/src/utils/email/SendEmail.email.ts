import nodemailer from "nodemailer";
import { SMTP_TRANSPORT_OPTIONS } from "../../helpers/email/SMTPTransportOptions";

// async..await is not allowed in global scope, must use a wrapper
export const sendEmail = async (to: string, html: string) => {
    try {
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport(SMTP_TRANSPORT_OPTIONS);

        // send mail with defined transport object
        await transporter.sendMail({
            from: '"Fred Foo 👻" <foo@example.com>', // sender address
            to, // list of receivers
            subject: "Change Password", // Subject line
            html, // html body
        });
    } catch (error) {
        console.log(">>> ERROR FOR SEND EMAIL: ", error.messages);
    }
};
