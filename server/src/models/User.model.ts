import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";

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
    private _createdAt!: Date;
    private _updatedAt!: Date;

    @PrimaryGeneratedColumn()
    public get id(): number {
        return this._id;
    }

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

    @Column()
    public get firstName(): string {
        return this._firstName;
    }

    public set firstName(firstName: string) {
        this._firstName = firstName;
    }

    @Column()
    public get surname(): string {
        return this._surname;
    }

    public set surname(surname: string) {
        this._surname = surname;
    }

    @Column()
    public get dateOfBirth(): Date {
        return this._dateOfBirth;
    }

    public set dateOfBirth(dateOfBirth: Date) {
        this._dateOfBirth = dateOfBirth;
    }

    @Column()
    public get gender(): string {
        return this._gender;
    }

    public set gender(gender: string) {
        this._gender = gender;
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
