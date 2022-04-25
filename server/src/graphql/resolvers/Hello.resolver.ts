import { Ctx, Query, Resolver } from "type-graphql";
import { Context } from "../../types/graphql/Context";

@Resolver()
export class HelloResolver {
    @Query((_return) => String)
    hello(
        @Ctx()
        { req }: Context
    ) {
        console.log(req.session.userId);

        return "hello world!";
    }
}
