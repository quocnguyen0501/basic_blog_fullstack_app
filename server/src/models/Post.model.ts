import { Field, ID, ObjectType } from "type-graphql";
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";

@ObjectType()
@Entity()
export class Post extends BaseEntity {
    private _id!: number;
    private _title!: string;
    private _content!: string;
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

    @Field((_type) => Date)
    @CreateDateColumn()
    public get creactedAt(): Date {
        return this._createdAt;
    }

    public set creactedAt(createdAt: Date) {
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
