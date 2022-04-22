import "reflect-metadata";
import express from "express";
import { createServer } from "http";
import { ApolloServer, ExpressContext } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import {
    ApolloServerPluginDrainHttpServer,
    ApolloServerPluginLandingPageGraphQLPlayground,
} from "apollo-server-core";

import mongoose from "mongoose";
import session from "express-session";

import {
    DATA_SOURCE,
    OPTIONS_CONNECT_MONGO,
    URI,
} from "./helpers/database/DatabaseHelper";
import { RESOLVERS } from "./graphql/resolvers/Resolvers";
import { __prod__ } from "./utils/constants/constants";
import { SESSION_OPTION } from "./helpers/storage/SessionCookieHelper";
import { Context } from "./types/graphql/Context";

const main = async () => {
    await DATA_SOURCE.initialize();

    const app = express();

    /**
     * Session/Coockie Store
     */
    await mongoose.connect(URI, OPTIONS_CONNECT_MONGO);

    console.log("🚀 Connect Mongo Success!");

    app.set('trust proxy', 1)

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
        context: ({ req, res } : Context) => ({
            req,
            res,
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
