import { Post } from "./../../models/Post.model";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class PaginatedPost {
    @Field()
    totalPost: Number;

    @Field()
    timeCompareCreatedAt?: Date;

    @Field()
    hasMore: boolean;

    @Field((_type) => [Post])
    paginatedPosts: Post[];
}
