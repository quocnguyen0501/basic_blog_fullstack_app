import { createUnionType } from "type-graphql";
import { ErrorMutationResponse } from "../ErrorMutationResponse";
import { PostMutationResponse } from "../PostMutationResponse";

export const PostUnionMutationResponse = createUnionType({
    name: "PostUnionMutationResponse",
    types: () => [PostMutationResponse, ErrorMutationResponse],
    resolveType: (outputValue) => {
        if ("errors" in outputValue) {
            return ErrorMutationResponse;
        } else {
            return PostMutationResponse;
        }
    },
});
