import { Field, ObjectType } from "type-graphql";
import { IMutaionResponse } from "./MutationResponse";
import { Post } from "../../entities/Post.entity";

@ObjectType({
    implements: IMutaionResponse,
})
export class PostMutationResponse implements IMutaionResponse {
    code: number;
    success: boolean;
    message: string;

    @Field({
        nullable: true,
    })
    post?: Post;
}
