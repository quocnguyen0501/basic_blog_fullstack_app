import { Field, ObjectType } from "type-graphql";
import { IMutaionResponse } from "./MutationResponse";
import { Post } from "../../models/Post.model";
import { FieldError } from "./FieldError";

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

    @Field((_type) => [FieldError], {
        nullable: true,
    })
    errors?: FieldError[];
}
