import * as Yup from "yup";

export const validateForgotPasswordSchema = Yup.object({
    email: Yup.string()
        .required("Please enter an email!")
        .matches(
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Please enter valid Email address"
        ),
});
