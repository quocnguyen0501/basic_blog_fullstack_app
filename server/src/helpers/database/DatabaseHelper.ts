import { ENTITIES } from '../../models/Entities';
import { DataSource } from 'typeorm';
import { DATABASE_CONFIGS } from './DatabaseConfig';


export const DATA_SOURCE = new DataSource({
    type: "postgres",
    host: DATABASE_CONFIGS.HOST,
    port: DATABASE_CONFIGS.PORT,
    database: DATABASE_CONFIGS.DATABASE,
    username: DATABASE_CONFIGS.USERNAME,
    password: DATABASE_CONFIGS.PASSWORD,
    logging: true,
    synchronize: true,
    entities: ENTITIES
})