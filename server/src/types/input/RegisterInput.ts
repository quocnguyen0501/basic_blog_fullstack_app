import { Field, InputType } from "type-graphql";

@InputType()
export class RegisterInput {
    @Field()
    email: string;

    @Field()
    password: string;

    @Field()
    firstName: string;

    @Field()
    surname: string;

    @Field()
    day: string;

    @Field()
    month: string;

    @Field()
    year: string;

    @Field()
    gender: string;
}
