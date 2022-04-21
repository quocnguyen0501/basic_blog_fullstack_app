import { ENTITIES } from "../../models/Entities";
import { DataSource } from "typeorm";
import { DATABASE_CONFIGS } from "./DatabaseConfig";

export const DATA_SOURCE = new DataSource({
    type: "postgres",
    host: DATABASE_CONFIGS.HOST,
    port: DATABASE_CONFIGS.PORT,
    database: DATABASE_CONFIGS.DATABASE,
    username: DATABASE_CONFIGS.USERNAME,
    password: DATABASE_CONFIGS.PASSWORD,
    logging: true,
    synchronize: true,
    entities: ENTITIES,
});

export const URI = `mongodb+srv://${DATABASE_CONFIGS.USERNAME_MONGO}:${DATABASE_CONFIGS.PASSWORD_MONGO}@blog.iihsp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

export const OPTIONS_CONNECT_MONGO = {
    autoIndex: false, // Don't build indexes
    maxPoolSize: 10, // Maintain up to 10 socket connections
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4, // Use IPv4, skip trying IPv6
};
