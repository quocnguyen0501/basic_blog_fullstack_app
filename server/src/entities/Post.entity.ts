import { Field, ID, ObjectType } from "type-graphql";
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";
import { User } from "./User.entity";
import { Vote } from "./Vote.entity";

@ObjectType()
@Entity()
export class Post extends BaseEntity {
    private _id!: number;
    private _userId!: number;
    private _user!: User;
    private _title!: string;
    private _content!: string;
    private _votes!: Vote[];
    private _points!: number;
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

    @Field((_type) => Number)
    @Column()
    public get userId(): number {
        return this._userId;
    }

    public set userId(userId: number) {
        this._userId = userId;
    }

    /**
     * many photos are owned by one user
     */
    @ManyToOne(() => User, (user) => user.posts)
    public get user(): User {
        return this._user;
    }

    public set user(user: User) {
        this._user = user;
    }

    @Field((_type) => String)
    @Column()
    public get title(): string {
        return this._title;
    }

    public set title(title: string) {
        this._title = title;
    }

    @Field((_type) => String)
    @Column()
    public get content(): string {
        return this._content;
    }

    public set content(content: string) {
        this._content = content;
    }

    @OneToMany((_to) => Vote, (vote) => vote.post)
    public get votes(): Vote[] {
        return this._votes;
    }

    public set votes(votes: Vote[]) {
        this._votes = votes;
    }

    @Field()
    @Column({
        default: 0,
    })
    public get points(): number {
        return this._points;
    }

    public set points(points: number) {
        this._points = points;
    }

    @Field((_type) => Date)
    @CreateDateColumn({
        type: "timestamptz",
    })
    public get createdAt(): Date {
        return this._createdAt;
    }

    public set createdAt(createdAt: Date) {
        this._createdAt = createdAt;
    }

    @Field((_type) => Date)
    @UpdateDateColumn({
        type: "timestamptz",
    })
    public get updatedAt(): Date {
        return this._updatedAt;
    }

    public set updatedAt(updatedAt: Date) {
        this._updatedAt = updatedAt;
    }
}
