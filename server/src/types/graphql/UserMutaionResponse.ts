import { Field, ObjectType } from "type-graphql";
import { IMutaionResponse } from "./MutationResponse";

import { User } from "../../models/User.model";
import { FieldError } from "./FieldError";

@ObjectType({
    implements: IMutaionResponse,
})
export class UserMutationResponse implements IMutaionResponse {
    code: number;
    success: boolean;
    message: string;

    @Field({
        nullable: true,
    })
    user?: User;

    @Field((_type) => [FieldError], { nullable: true })
    errors?: FieldError[];
}
