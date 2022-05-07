import * as Yup from "yup";

export const validateChangePasswordSchema = Yup.object({
    newPassword: Yup.string()
        .required("Please enter a password")
        .min(6, "Must be 4 charaters or more"),
});
