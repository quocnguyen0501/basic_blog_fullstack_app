import { ErrorMutationResponse } from "../../types/graphql/ErrorMutationResponse";

export const getErrorMutationResponse = (
    error: any,
    code: number,
    field: string,
    message: string
): ErrorMutationResponse => {
    return {
        code: code,
        success: false,
        message: `>>> Internal Server Error: ${error.message}`,
        errors: [
            {
                field: field,
                message: message,
            },
        ],
    };
};
