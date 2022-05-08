import { Field, InputType } from "type-graphql";

@InputType()
export class CreatePostInput {
    @Field()
    userId: number;

    @Field()
    title: string;

    @Field()
    content: string;
}
