import { Post } from "./postgres/Post.model";
import { User } from "./postgres/User.model";
import { Vote } from "./postgres/Vote.model";

export const ENTITIES: Array<any> = [
    User,
    Post,
    Vote
];
