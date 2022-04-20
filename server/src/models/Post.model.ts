import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";

@Entity()
export class Post extends BaseEntity {
    private _id!: number;
    private _title!: string;
    private _content!: string;
    private _createdAt!: Date;
    private _updatedAt!: Date;

    @PrimaryGeneratedColumn()
    public get id(): number {
        return this._id;
    }

    @Column()
    public get title(): string {
        return this._title;
    }

    public set title(title: string) {
        this._title = title;
    }

    @Column()
    public get content(): string {
        return this._content;
    }

    public set content(content: string) {
        this._content = content;
    }
        
    @CreateDateColumn()
    public get creactedAt(): Date {
        return this._createdAt;
    }

    @UpdateDateColumn()
    public get updatedAt(): Date {
        return this._updatedAt;
    }
}
