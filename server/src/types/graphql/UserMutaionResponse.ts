import { User } from "../../entities/User.entity";
import { Field, ObjectType } from "type-graphql";
import { IMutaionResponse } from "./MutationResponse";

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
