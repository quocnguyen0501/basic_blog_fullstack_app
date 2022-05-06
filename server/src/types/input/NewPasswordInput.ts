import { Field, InputType } from "type-graphql";

@InputType()
export class NewPasswordInput {
    @Field()
    newPassword: string;
}
