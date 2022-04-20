import { NonEmptyArray } from "type-graphql";
import { HelloResolver } from "./hello.resolver";
import { UserResolver } from "./User.resolver";

export const RESOLVERS: NonEmptyArray<Function> | NonEmptyArray<string> = [
    HelloResolver,
    UserResolver
];
