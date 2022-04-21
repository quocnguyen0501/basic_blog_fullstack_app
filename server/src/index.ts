import "reflect-metadata";
import express from "express";
import { createServer } from "http";
import { ApolloServer, ExpressContext } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import {
    ApolloServerPluginDrainHttpServer,
    ApolloServerPluginLandingPageGraphQLPlayground,
} from "apollo-server-core";

import { DATA_SOURCE, OPTIONS_CONNECT_MONGO, URI } from "./helpers/database/DatabaseHelper";
import { RESOLVERS } from "./graphql/resolvers/Resolvers";
import mongoose from "mongoose";

const main = async () => {
    await DATA_SOURCE.initialize();

    const app = express();

    /**
     * Session/Coockie Store
     */
    await mongoose.connect(URI, OPTIONS_CONNECT_MONGO);

    console.log("🚀 Connect Mongo Success!");

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
