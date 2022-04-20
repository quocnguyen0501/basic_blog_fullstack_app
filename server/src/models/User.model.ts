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
    @PrimaryGeneratedColumn()
    private id!: number;

    @Column({
        unique: true,
    })
    private email!: string;

    @Column()
    private password!: string;

    @Column()
    private firstName!: string;

    @Column()
    private surname!: string;

    @Column()
    private dateOfBirth!: Date;

    @CreateDateColumn()
    private createdAt!: Date;

    @UpdateDateColumn()
    private updatedAt!: Date;

    constructor(
        email: string,
        password: string,
        firstName: string,
        surname: string,
        dateOfBirth: Date
    ) {
        super();
        this.email = email;
        this.password = password;
        this.firstName = firstName;
        this.surname = surname;
        this.dateOfBirth = dateOfBirth;
    }

    public getId(): number {
        return this.id;
    }

    public getEmail(): string {
        return this.email;
    }

    public setEmail(email: string): void {
        this.email = email;
    }

    public getPassword(): string {
        return this.password;
    }

    public setPassword(password: string): void {
        this.password = password;
    }

    public getFirstName(): string {
        return this.firstName;
    }

    public setFirstName(firstName: string): void {
        this.firstName = firstName;
    }

    public getSurname(): string {
        return this.surname;
    }

    public setSurname(surname: string): void {
        this.surname = surname;
    }

    public getDateOfBirth(): Date {
        return this.dateOfBirth;
    }

    public setDateOfBirth(dateOfBirth: Date): void {
        this.dateOfBirth = dateOfBirth;
    }

    public getCreatedAt(): Date {
        return this.createdAt;
    }

    public getUpdatedAt(): Date {
        return this.updatedAt;
    }
}
