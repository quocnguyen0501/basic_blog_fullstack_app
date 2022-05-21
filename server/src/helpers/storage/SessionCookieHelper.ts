import MongoStore from "connect-mongo";
import { SessionOptions } from "express-session";
import { __prod__ } from "../../utils/constants/constants";
import { URI } from "../database/DatabaseHelper";
import { SESSION_COOKIE_CONFIGS } from "./SessionCookieConfig";

export const SESSION_OPTION: SessionOptions = {
    name: SESSION_COOKIE_CONFIGS.COOKIE_NAME,
    store: MongoStore.create({
        mongoUrl: URI,
    }),
    cookie: {
        // Set time of cookie
        maxAge: 1000 * 60 * 60, //1hours
        httpOnly: true, //JS in front end can not read cookie
        secure: __prod__, //cookie only work in https
        sameSite: "lax", //protect CSRF
        domain: __prod__ ? ".vercel.app" : undefined,
    },
    secret: SESSION_COOKIE_CONFIGS.SESSION_SECRET,
    saveUninitialized: false, //don't set empty session when start app
    resave: false,
};
