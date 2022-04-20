import { Mutation, Resolver } from "type-graphql";
import { User } from "../../models/User.model";

@Resolver()
export class UserResolver {
    @Mutation(
        _return => User
    )
    register(
        email: string,
        password: string,
        firstName: string,
        surname: string,
        dateOfBirth: 
    ) {

    }
}