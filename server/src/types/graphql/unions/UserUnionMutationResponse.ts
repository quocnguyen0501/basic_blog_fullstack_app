import { createUnionType } from "type-graphql";
import { ErrorMutationResponse } from "../ErrorMutationResponse";
import { UserMutationResponse } from "../UserMutaionResponse";

export const UserUnionMutationResponse = createUnionType({
    name: "UserUnionMutationResponse",
    types: () => [UserMutationResponse, ErrorMutationResponse],
    resolveType: (outputValue) => {
        if ("errors" in outputValue) {
            return ErrorMutationResponse;
        } else {
            return UserMutationResponse;
        }
    },
});
