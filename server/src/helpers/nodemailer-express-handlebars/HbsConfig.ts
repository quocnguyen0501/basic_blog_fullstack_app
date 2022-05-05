import path from "path";
import { HbsConfigs } from "../../types/nodemailer-express-handlebars/HsbConfig";
import { ViewEngine } from "../../types/nodemailer-express-handlebars/ViewEngine";

export const VIEW_ENGINE: ViewEngine = {
    extName: ".hbs",
    partialsDir: path.join(__dirname, "../../../assets/template/email/"),
    layoutsDir: path.join(__dirname, "../../../assets/template/email/"),
    defaultLayout: "",
};

export const HBS_CONFIGS: HbsConfigs = {
    viewEngine: VIEW_ENGINE,
    viewPath: path.join(__dirname, "../../../assets/template/email/"),
    extName: ".hbs",
};
