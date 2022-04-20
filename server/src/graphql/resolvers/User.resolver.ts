import { Arg, Mutation, Resolver } from "type-graphql";
import * as argon2 from "argon2";

import { User } from "../../models/User.model";

@Resolver()
export class UserResolver {
    @Mutation((_return) => User, { nullable: true })
    async register(
        @Arg("email")
        email: string,
        @Arg("password")
        password: string,
        @Arg("firtName")
        firstName: string,
        @Arg("surname")
        surname: string,
        @Arg("date")
        day: string,
        @Arg("month")
        month: string,
        @Arg("year")
        year: string,
        @Arg("gender")
        gender: string
    ) {
        /**
         * Pay attention to the month (parts[1]); JavaScript counts months from 0:
         * January - 0, February - 1, etc.
         */
        let dateOfBirth = new Date(+year, +month - 1, +day);

        const existingUser = await User.findOneBy({ email });

        if (existingUser) {
            return null;
        }

        const hashPassword = await argon2.hash(password);
    }
}
