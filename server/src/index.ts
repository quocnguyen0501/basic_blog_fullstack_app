import "reflect-metadata";
import express from "express";
import { createServer } from "http";
// import { ApolloServer, ExpressContext } from "apollo-server-express";
// import { buildSchema } from "type-graphql";
// import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";

import { DATA_SOURCE } from "./helpers/database/DatabaseHelper";

const main = async () => {
    try {
        await DATA_SOURCE.initialize();
    } catch (error) {
        console.log(">>>ERROR DATABASE: ", error.message);
        throw new Error(error);
    }
    const app = express();

    const httpServer = createServer(app);

    // const apolloServer: ApolloServer<ExpressContext> = new ApolloServer({
    //     schema: await buildSchema({
    //         validate: false,
    //         resolvers: ["dasdas"],
    //     }),
    //     plugins: [
    //         ApolloServerPluginDrainHttpServer({ httpServer }),
    //         // ApolloServerPluginLandingPageGraphQLPlayground
    //     ],
    // });

    // await apolloServer.start();

    const PORT = process.env.PORT || 4000;

    await new Promise((resolve) =>
        httpServer.listen({ port: PORT }, resolve as () => void)
    );

    console.log(
        // `🚀 Server ready and listening at ${PORT}. GRAPHQL ENDPOINT ON http://localhost:${PORT}${apolloServer.graphqlPath}`
        `🚀 Server ready and listening at ${PORT}. GRAPHQL ENDPOINT ON http://localhost:${PORT}`
    );
};

main().catch((error) => console.log("ERROR STARTING SERVER: ", error));
