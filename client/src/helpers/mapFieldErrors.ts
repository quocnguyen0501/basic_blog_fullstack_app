import { FieldError } from "../generated/graphql";

export const mapFieldErrors = (
    errors: FieldError[]
): {
    [key: string]: string;
    /** if don't know field in object return -> define fields is an array string */
} => {
    const errs = errors.reduce((accumulatedErrorsObj, error) => {
        return {
            ...accumulatedErrorsObj,
            [error.field]: error.message,
        };
    }, {});

    return errs;
};
