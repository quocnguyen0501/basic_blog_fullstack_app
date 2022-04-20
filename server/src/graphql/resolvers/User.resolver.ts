import { Arg, Mutation, Resolver } from "type-graphql";
import * as argon2 from "argon2";

import { User } from "../../models/User.model";
import { UserMutationResponse } from "../../types/graphql/UserMutaionResponse";
import { RegisterInput } from "../../types/input/RegisterInput";
import { ValidateRegisterInput } from "../../utils/validates/RegisterInput.validate";

@Resolver()
export class UserResolver {
    @Mutation((_return) => UserMutationResponse, { nullable: true })
    async register(
        @Arg("registerInput")
        registerInput: RegisterInput
    ): Promise<UserMutationResponse> {
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

                return {
                    code: 200,
                    success: true,
                    message: "Registation successful",
                    user: await User.save(newUser),
                };
            }
        } catch (error) {
            console.log(error);
            return {
                code: 500,
                success: false,
                message: `>>> Internal Server Error: ${error.message}`,
                errors: [
                    {
                        field: "email",
                        message: "Email already taken!",
                    },
                ],
            };
        }
    }
}
