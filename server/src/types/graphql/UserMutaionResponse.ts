import { Field, ObjectType } from "type-graphql";
import { IMutaionResponse } from "./MutationResponse";

import { User } from "../../models/postgres/User.model";

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
}
