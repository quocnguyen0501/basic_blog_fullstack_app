import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import * as argon2 from "argon2";

import { User } from "../../models/User.model";
import { UserMutationResponse } from "../../types/graphql/UserMutaionResponse";
import { RegisterInput } from "../../types/input/RegisterInput";
import { LoginInput } from "../../types/input/LoginInput";
import { ValidateRegisterInput } from "../../utils/validates/RegisterInput.validate";
import { ValidateLoginInput } from "../../utils/validates/LoginInput.validate";
import { Context } from "../../types/graphql/Context";
import { SESSION_COOKIE_CONFIGS } from "../../helpers/storage/SessionCookieConfig";
import { ErrorMutationResponse } from "../../types/graphql/ErrorMutationResponse";
import { getErrorMutationResponse } from "../../helpers/resolvers/ErrorMutationResponseHelper";
import { HTTP_STATUS_CODE } from "src/utils/constants/constants";

@Resolver()
export class UserResolver {
    @Mutation((_return) => UserMutationResponse || ErrorMutationResponse, {
        nullable: true,
    })
    async register(
        @Arg("registerInput")
        registerInput: RegisterInput,
        @Ctx()
        { req }: Context
    ): Promise<UserMutationResponse | ErrorMutationResponse> {
        const validateRegisterInputError = ValidateRegisterInput(registerInput);

        if (validateRegisterInputError !== null) {
            return {
                code: 400,
                success: false,
                ...validateRegisterInputError,
            };
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
                return {
                    code: 400,
                    success: false,
                    message: "Duplicated email! Please try again!",
                    errors: [
                        {
                            field: "email",
                            message: "Email already taken!",
                        },
                    ],
                };
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

                return {
                    code: 200,
                    success: true,
                    message: "Registation successful",
                    user: newUser,
                };
            }
        } catch (error) {
            return getErrorMutationResponse(error, HTTP_STATUS_CODE.INTERNAL_SERVER, "user", "error register in mutation");
        }
    }

    @Mutation((_return) => UserMutationResponse || ErrorMutationResponse)
    async login(
        @Arg("loginInput")
        loginInput: LoginInput,
        @Ctx()
        { req }: Context
    ): Promise<UserMutationResponse | ErrorMutationResponse> {
        const validateLoginInputError = ValidateLoginInput(loginInput);
        if (validateLoginInputError !== null) {
            return {
                code: 400,
                success: false,
                ...validateLoginInputError,
            };
        } else {
            try {
                const { email, password } = loginInput;

                const existingUser = await User.findOneBy({ email });

                if (!existingUser) {
                    return {
                        code: 400,
                        success: false,
                        message: "User not found",
                    };
                }

                const isPwdValid = await argon2.verify(
                    existingUser.password,
                    password
                );

                if (!isPwdValid) {
                    return {
                        code: 400,
                        success: false,
                        message: "Incorect password",
                    };
                }

                /**
                 * Create Session and return Cookie
                 */

                req.session.userId = existingUser.id;

                return {
                    code: 200,
                    success: true,
                    message: "Login Successfully",
                    user: existingUser,
                };
            } catch (error) {
                return getErrorMutationResponse(error, HTTP_STATUS_CODE.INTERNAL_SERVER, "user", "error login in mutation");
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
}
