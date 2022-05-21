import { BaseEntity, Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { Post } from "./Post.entity";
import { User } from "./User.entity";

@Entity()
export class Vote extends BaseEntity {
    private _userId!: number;
    private _user!: User;
    private _postId!: number;
    private _post!: Post;
    private _value!: number;

    @PrimaryColumn()
    public get userId(): number {
        return this._userId;
    }

    public set userId(userId: number) {
        this._userId = userId;
    }

    @ManyToOne((_to) => User, (user) => user.votes)
    public get user(): User {
        return this._user;
    }

    public set user(user: User) {
        this._user = user;
    }

    @PrimaryColumn()
    public get postId(): number {
        return this._postId;
    }

    public set postId(postId: number) {
        this._postId = postId;
    }

    @ManyToOne((_to) => Post, (post) => post.votes)
    public get post(): Post {
        return this._post;
    }

    public set post(post: Post) {
        this._post = post;
    }

    @Column()
    public get value(): number {
        return this._value;
    }

    public set value(value: number) {
        this._value = value;
    }
}
