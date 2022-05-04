import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import * as argon2 from "argon2";

import { User } from "../../models/User.model";
import { RegisterInput } from "../../types/input/RegisterInput";
import { LoginInput } from "../../types/input/LoginInput";
import { ValidateRegisterInput } from "../../utils/validates/RegisterInput.validate";
import { ValidateLoginInput } from "../../utils/validates/LoginInput.validate";
import { Context } from "../../types/graphql/Context";
import { SESSION_COOKIE_CONFIGS } from "../../helpers/storage/SessionCookieConfig";
import { ErrorMutationResponse } from "../../types/graphql/ErrorMutationResponse";
import { getErrorMutationResponse } from "../../helpers/resolvers/ErrorMutationResponseHelper";
import { HTTP_STATUS_CODE } from "../../utils/constants/constants";
import { UserUnionMutationResponse } from "../../types/graphql/unions/UserUnionMutationResponse";
import { ForgotPasswordInput } from "../../types/input/ForgotPasswordInput";
import { sendEmail } from "../../utils/email/SendEmail.email";

@Resolver()
export class UserResolver {
    @Query((_return) => User, {
        nullable: true,
    })
    async loginProfile(
        @Ctx()
        { req }: Context
    ): Promise<User | undefined | null> {
        if (!req.session.userId) {
            return null;
        }

        const user = await User.findOneBy({
            id: req.session.userId,
        });

        return user;
    }

    @Mutation((_return) => [UserUnionMutationResponse], {
        nullable: true,
    })
    async register(
        @Arg("registerInput")
        registerInput: RegisterInput,
        @Ctx()
        { req }: Context
    ): Promise<Array<typeof UserUnionMutationResponse>> {
        const validateRegisterInputError = ValidateRegisterInput(registerInput);

        if (validateRegisterInputError !== null) {
            const error: ErrorMutationResponse = {
                code: HTTP_STATUS_CODE.BAD_REQUEST,
                success: false,
                ...validateRegisterInputError,
            };

            return [error];
        }
        try {
            const {
                email,
                password,
                firstName,
                surname,
                day,
                month,
                year,
                gender,
            } = registerInput;
            /**
             * Pay attention to the month (parts[1]); JavaScript counts months from 0:
             * January - 0, February - 1, etc.
             */
            let dateOfBirth = new Date(+year, +month - 1, +day + 1);

            const existingUser = await User.findOneBy({ email });

            if (existingUser) {
                const error: ErrorMutationResponse = {
                    code: HTTP_STATUS_CODE.BAD_REQUEST,
                    success: false,
                    message: "Duplicated email! Please try again!",
                    errors: [
                        {
                            field: "email",
                            message: "Email already taken!",
                        },
                    ],
                };
                return [error];
            } else {
                const hashPassword = await argon2.hash(password);

                const newUser = User.create({
                    email: email,
                    password: hashPassword,
                    firstName: firstName,
                    surname: surname,
                    dateOfBirth: dateOfBirth,
                    gender: gender,
                });

                await newUser.save();

                req.session.userId = newUser.id;

                return [
                    {
                        code: HTTP_STATUS_CODE.SUCCESS,
                        success: true,
                        message: "Registation successful",
                        user: newUser,
                    },
                ];
            }
        } catch (error) {
            return [
                getErrorMutationResponse(
                    error,
                    HTTP_STATUS_CODE.INTERNAL_SERVER,
                    "user",
                    "error register in mutation"
                ),
            ];
        }
    }

    @Mutation((_return) => [UserUnionMutationResponse])
    async login(
        @Arg("loginInput")
        loginInput: LoginInput,
        @Ctx()
        { req }: Context
    ): Promise<Array<typeof UserUnionMutationResponse>> {
        const validateLoginInputError = ValidateLoginInput(loginInput);
        if (validateLoginInputError !== null) {
            return [
                {
                    code: HTTP_STATUS_CODE.BAD_REQUEST,
                    success: false,
                    ...validateLoginInputError,
                },
            ];
        } else {
            try {
                const { email, password } = loginInput;

                const existingUser = await User.findOneBy({ email });

                if (!existingUser) {
                    return [
                        {
                            code: HTTP_STATUS_CODE.BAD_REQUEST,
                            success: false,
                            message: "User not found",
                        },
                    ];
                }

                const isPwdValid = await argon2.verify(
                    existingUser.password,
                    password
                );

                if (!isPwdValid) {
                    return [
                        {
                            code: HTTP_STATUS_CODE.BAD_REQUEST,
                            success: false,
                            message: "Incorect password",
                            errors: [
                                {
                                    field: "password",
                                    message: "Email was incorrect",
                                },
                            ],
                        },
                    ];
                }

                /**
                 * Create Session and return Cookie
                 */

                req.session.userId = existingUser.id;

                return [
                    {
                        code: HTTP_STATUS_CODE.SUCCESS,
                        success: true,
                        message: "Login Successfully",
                        user: existingUser,
                    },
                ];
            } catch (error) {
                return [
                    getErrorMutationResponse(
                        error,
                        HTTP_STATUS_CODE.INTERNAL_SERVER,
                        "user",
                        "error login in mutation"
                    ),
                ];
            }
        }
    }

    @Mutation((_return) => Boolean)
    logout(
        @Ctx()
        { req, res }: Context
    ): Promise<Boolean> {
        return new Promise((resolve, _reject) => {
            res.clearCookie(SESSION_COOKIE_CONFIGS.COOKIE_NAME);
            req.session.destroy((error) => {
                if (error) {
                    console.log("Destroying Session error: ", error);
                    resolve(false);
                } else {
                    resolve(true);
                }
            });
        });
    }

    @Mutation((_return) => Boolean)
    async forgotPassword(
        @Arg("forgotPasswordInput")
        forgotPasswordInput: ForgotPasswordInput
    ): Promise<boolean> {
        const user = await User.findOneBy({
            email: forgotPasswordInput.email,
        });

        if (!user) {
            return true;
        } else {
            const token = "";
            // Save token to database

            // Send reset password link to user via email
            await sendEmail(
                // forgotPasswordInput.email,
                "nnguyen18110166@gmail.com",
                `<a href='http://localhost:3000/change-password?token=${token}'>Click here to reset password</a>`
            );

            console.log(">>> SEND SUCCESS !!!");

            return true;
        }
    }
}
