import { RegisterInput } from "../../types/input/RegisterInput";
import { isPositiveInteger } from "../commons/IsPositiveInteger.util.common";

export const ValidateRegisterInput = ({
    email,
    password,
    firstName,
    surname,
    day,
    month,
    year,
    gender,
}: RegisterInput) => {
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
    if (firstName.includes("@")) {
        return {
            message: "Invalid first name",
            errors: [
                {
                    field: "firstName",
                    message: "First name can't include @ symbol",
                },
            ],
        };
    }
    if (surname.includes("@")) {
        return {
            message: "Invalid surname",
            errors: [
                {
                    field: "surname",
                    message: "Surname can't include @ symbol",
                },
            ],
        };
    }

    if (gender.includes("@")) {
        return {
            message: "Invalid gender",
            errors: [
                {
                    field: "gender",
                    message: "Gender can't include @ symbol",
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

    if (firstName.length <= 3) {
        return {
            message: "Invalid first name",
            errors: [
                {
                    field: "first name",
                    message: "Length must be greater than 3",
                },
            ],
        };
    }

    if (surname.length <= 3) {
        return {
            message: "Invalid surname",
            errors: [
                {
                    field: "surname",
                    message: "Length must be greater than 3",
                },
            ],
        };
    }

    /**
     * Check is positive interger day month year
     */
    if (!isPositiveInteger(day) && (+day > 0 && +day < 32)) {
        return {
            message: "Invalid day",
            errors: [
                {
                    field: "day",
                    message: "Day must be Positive Integer and > 0 and < 32",
                },
            ],
        };
    }

    if (!isPositiveInteger(month) && (+month > 0 && +month < 13)) {
        return {
            message: "Invalid month",
            errors: [
                {
                    field: "month",
                    message: "Month must be Positive Integer and > 0 and < 13",
                },
            ],
        }
    }

    if (!isPositiveInteger(month) && (+month > 1500)) {
        return {
            message: "Invalid year",
            errors: [
                {
                    field: "year",
                    message: "Year must be Positive Integer and > 1500",
                },
            ],
        }
    }
    return null;
};
