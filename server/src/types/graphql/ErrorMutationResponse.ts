import { Field, ObjectType } from "type-graphql";
import { FieldError } from "./FieldError";
import { IMutaionResponse } from "./MutationResponse";

@ObjectType({
    implements: IMutaionResponse,
})
export class ErrorMutationResponse implements IMutaionResponse {
    code: number;
    success: boolean;
    message: string;

    @Field((_type) => [FieldError], {
        nullable: true,
    })
    errors: FieldError[];
}