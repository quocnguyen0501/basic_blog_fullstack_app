import { ErrorMutationResponse } from "../../types/graphql/ErrorMutationResponse";

export const getErrorMutationResponse = (
    error: any,
    code: number,
    field: string,
    message: string,
    messageField?: string
): ErrorMutationResponse => {
    return {
        code: code,
        success: false,
        message: messageField
            ? messageField
            : `>>> Internal Server Error: ${error.message}`,
        errors: [
            {
                field: field,
                message: message,
            },
        ],
    };
};
