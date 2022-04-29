import * as Yup from "yup";

export const validateSignUpSchema = Yup.object({
    email: Yup.string()
        .required("Please enter an email!")
        .matches(
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Please enter valid Email address"
        ),
    firstName: Yup.string()
        .required("Please enter first name")
        .min(4, "Must be 4 charaters or more"),
    surname: Yup.string()
        .required("Please enter surname")
        .min(4, "Must be 4 charaters or more"),
    password: Yup.string()
        .required("Please enter a password")
        .min(6, "Must be 4 charaters or more"),
    confirmPassword: Yup.string()
        .required("Please enter a confirm password")
        .oneOf([Yup.ref("password"), null], "Password must match"),
    day: Yup.string().required("Required"),
    month: Yup.string().required("Required"),
    year: Yup.string().required("Required"),
    gender: Yup.string().required("Required"),
});
