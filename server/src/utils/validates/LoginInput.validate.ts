import { LoginInput } from "../../types/input/LoginInput";

export const ValidateLoginInput = ({ email, password }: LoginInput) => {
    /**
     * Check have @ charater in field
     */
    if (!email.includes("@")) {
        return {
            message: "Invalid email",
            errors: [
                {
                    field: "email",
                    message: "Email must include @ symbol",
                },
            ],
        };
    }

    /**
     * Check length
     */
    if (email.length <= 3) {
        return {
            message: "Invalid email",
            errors: [
                { field: "email", message: "Length must be greater than 3" },
            ],
        };
    }

    if (password.length < 6) {
        return {
            message: "Invalid password",
            errors: [
                { field: "password", message: "Length must be greater than 6" },
            ],
        };
    }

    return null;
};
