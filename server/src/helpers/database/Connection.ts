import path from "path";
import { __prod__ } from "../../utils/constants/constants";
import { ENTITIES } from "../../graphql/schemas/Entities";
import { DATABASE_CONFIGS } from "./DatabaseConfig";
import { getMigrationsURL } from "../../utils/migrations/handleURLMigration";

export const CONNECTION = {
    ...(__prod__
        ? { url: DATABASE_CONFIGS.URL_POSTGRES_DATABASE_HEROKU }
        : {
              host: DATABASE_CONFIGS.HOST,
              port: DATABASE_CONFIGS.PORT,
              database: DATABASE_CONFIGS.DATABASE,
              username: DATABASE_CONFIGS.USERNAME,
              password: DATABASE_CONFIGS.PASSWORD,
          }),
    logging: true,
    ...(__prod__
        ? {
              extra: {
                  ssl: {
                      rejectUnauthorized: false,
                  },
              },
              ssl: true,
          }
        : {}),
    ...(__prod__ ? {} : { synchronize: true }),
    entities: ENTITIES,
    migrations: [path.join(getMigrationsURL(__dirname), "/migrations/*")],
};
