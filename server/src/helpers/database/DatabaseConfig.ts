import dotenv from 'dotenv';
import { DatabaseInfo } from "src/types/database/DatabaseInfo";

dotenv.config();

export const DATABASE_CONFIGS : DatabaseInfo = {
    TYPE: process.env.DB_TYPE as string,
    HOST: process.env.DB_HOST as string,
    PORT: process.env.DB_PORT as unknown as number,
    DATABASE: process.env.DB_NAME as string,
    USERNAME: process.env.DB_USERNAME as string,
    PASSWORD: process.env.DB_PASSWORD as string,
}