import * as Yup from "yup";

export const validateSignInSchema = Yup.object({
    email: Yup.string()
        .required("Please enter an email!")
        .matches(
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Please enter valid Email address"
        ),
    password: Yup.string()
        .required("Please enter a password")
        .min(6, "Must be 4 charaters or more"),
});
