import { NonEmptyArray } from "type-graphql";
import { HelloResolver } from "./hello.resolver";

export const RESOLVERS: NonEmptyArray<Function> | NonEmptyArray<string> = [
    HelloResolver,
];
