import { Field, ID, ObjectType } from "type-graphql";
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";
import { Post } from "./Post.model";
import { Vote } from "./Vote.model";

@ObjectType()
@Entity({
    name: "Users",
})
export class User extends BaseEntity {
    private _id!: number;
    private _email!: string;
    private _password!: string;
    private _firstName!: string;
    private _surname!: string;
    private _dateOfBirth!: Date;
    private _gender!: string;
    private _posts: Post[];
    private _votes: Vote[];
    private _createdAt!: Date;
    private _updatedAt!: Date;

    @Field((_type) => ID)
    @PrimaryGeneratedColumn()
    public get id(): number {
        return this._id;
    }

    public set id(id: number) {
        this._id = id;
    }

    @Field((_type) => String)
    @Column({
        unique: true,
    })
    public get email(): string {
        return this._email;
    }

    public set email(email: string) {
        this._email = email;
    }

    @Column()
    public get password(): string {
        return this._password;
    }

    public set password(password: string) {
        this._password = password;
    }

    @Field((_type) => String)
    @Column()
    public get firstName(): string {
        return this._firstName;
    }

    public set firstName(firstName: string) {
        this._firstName = firstName;
    }

    @Field((_type) => String)
    @Column()
    public get surname(): string {
        return this._surname;
    }

    public set surname(surname: string) {
        this._surname = surname;
    }

    @Field((_type) => Date)
    @Column()
    public get dateOfBirth(): Date {
        return this._dateOfBirth;
    }

    public set dateOfBirth(dateOfBirth: Date) {
        this._dateOfBirth = dateOfBirth;
    }

    @Field((_type) => String)
    @Column()
    public get gender(): string {
        return this._gender;
    }

    public set gender(gender: string) {
        this._gender = gender;
    }

    @OneToMany(() => Post, (post) => post.user)
    public get posts(): Post[] {
        return this._posts;
    }

    public set posts(posts: Post[]) {
        this._posts = posts;
    }

    @OneToMany((_to) => Vote, (vote) => vote.user)
    public get votes(): Vote[] {
        return this._votes;
    }

    public set votes(vote: Vote[]) {
        this._votes = vote;
    }

    @Field((_type) => Date)
    @CreateDateColumn()
    public get createdAt(): Date {
        return this._createdAt;
    }

    public set createdAt(createdAt: Date) {
        this._createdAt = createdAt;
    }

    @Field((_type) => Date)
    @UpdateDateColumn()
    public get updatedAt(): Date {
        return this._updatedAt;
    }

    public set updatedAt(updatedAt: Date) {
        this._updatedAt = updatedAt;
    }
}
