import path from "path";
import { __prod__ } from "src/utils/constants/constants";
import { ENTITIES } from "../../graphql/schemas/Entities";
import { DATABASE_CONFIGS } from "./DatabaseConfig";

const CONNECTION_DEV = {
    host: DATABASE_CONFIGS.HOST,
    port: DATABASE_CONFIGS.PORT,
    database: DATABASE_CONFIGS.DATABASE,
    username: DATABASE_CONFIGS.USERNAME,
    password: DATABASE_CONFIGS.PASSWORD,
    logging: true,
    synchronize: true,
    entities: ENTITIES,
    migrations: [path.join(__dirname, "/migrations/*")],
};

const CONNECTION_PUBLIC = {
    url: DATABASE_CONFIGS.URL_POSTGRES_DATABASE_HEROKU,
    logging: true,
    extra: {
        extra: {
            ssl: {
                rejectUnauthorized: false,
            },
        },
        ssl: true,
    },
    entities: ENTITIES,
    migrations: [path.join(__dirname, "/migrations/*")],
};

export const CONNECTION = () => (__prod__ ? CONNECTION_PUBLIC : CONNECTION_DEV);
