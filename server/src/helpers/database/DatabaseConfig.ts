import dotenv from "dotenv";
import { DatabaseInfo } from "../../types/database/DatabaseInfo";

dotenv.config();

export const DATABASE_CONFIGS: DatabaseInfo = {
    TYPE: process.env.DB_TYPE as string,
    HOST: process.env.DB_HOST as string,
    PORT: process.env.DB_PORT as unknown as number,
    DATABASE: process.env.DB_NAME as string,
    USERNAME: process.env.DB_USERNAME as string,
    PASSWORD: process.env.DB_PASSWORD as string,
    URL_POSTGRES_DATABASE_HEROKU: process.env.URL_POSTGRES_DATABASE as string,

    USERNAME_MONGO: process.env.SESSION_DB_USERNAME_DEV_PROD as string,
    PASSWORD_MONGO: process.env.SESSION_DB_UPASSWORD_DEV_PROD as string,
};
