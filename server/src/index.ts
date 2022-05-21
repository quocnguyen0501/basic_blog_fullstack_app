import "reflect-metadata";
import express from "express";
import { createServer } from "http";
import { ApolloServer, ExpressContext } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import {
    ApolloServerPluginDrainHttpServer,
    ApolloServerPluginLandingPageGraphQLPlayground,
} from "apollo-server-core";
import cors from "cors";

import mongoose from "mongoose";
import session from "express-session";

import {
    CONNECTION,
    OPTIONS_CONNECT_MONGO,
    URI,
} from "./helpers/database/DatabaseHelper";
import { RESOLVERS } from "./graphql/resolvers/Resolvers";
import { __prod__ } from "./utils/constants/constants";
import { SESSION_OPTION } from "./helpers/storage/SessionCookieHelper";
import { Context } from "./types/graphql/Context";
import { CORS } from "./helpers/cors/CorsConfig";
import { buildDataLoaders } from "./utils/data-loader/dataLoaders";
import { createConnection } from "typeorm";

const main = async () => {
    const connection = await createConnection({
        type: "postgres",
        ...CONNECTION,
    });

    const app = express();

    app.use(
        cors({
            origin: __prod__ ? CORS.CORS_ORIGIN_PROD : CORS.CORS_ORIGIN_DEV,
            credentials: true,
        })
    );

    /**
     * Session/Coockie Store
     */
    await mongoose.connect(URI, OPTIONS_CONNECT_MONGO);

    console.log("🚀 Connect Mongo Success!");

    app.set("trust proxy", 1);

    app.use(session(SESSION_OPTION));

    const httpServer = createServer(app);

    const apolloServer: ApolloServer<ExpressContext> = new ApolloServer({
        schema: await buildSchema({
            validate: false,
            resolvers: RESOLVERS,
        }),
        plugins: [
            ApolloServerPluginDrainHttpServer({ httpServer }),
            ApolloServerPluginLandingPageGraphQLPlayground(),
        ],
        context: ({ req, res }: Context) => ({
            req: req,
            res: res,
            connection: connection,
            dataLoaders: buildDataLoaders(),
        }),
    });

    await apolloServer.start();

    apolloServer.applyMiddleware({
        app,
        cors: false,
    });

    const PORT = process.env.PORT || 4000;

    await new Promise((resolve) =>
        httpServer.listen({ port: PORT }, resolve as () => void)
    );

    console.log(
        `🚀 Server ready and listening at ${PORT}. GRAPHQL ENDPOINT ON http://localhost:${PORT}${apolloServer.graphqlPath}`
    );
};

main().catch((error) => console.log("ERROR STARTING SERVER: ", error));
