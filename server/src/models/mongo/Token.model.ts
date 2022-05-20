import { getModelForClass, prop } from "@typegoose/typegoose";
import mongoose from "mongoose";
import { ObjectType } from "type-graphql";

@ObjectType()
export class Token {
    _id!: mongoose.Types.ObjectId;

    @prop({
        required: true,
    })
    private _userId!: string;

    @prop({
        required: true,
    })
    private _token!: string;

    @prop({
        default: Date.now(),
        expires: 5 * 60,
    })
    private _createdAt!: Date;

    public get userId(): string {
        return this._userId;
    }

    public set userId(userId: string) {
        this._userId = userId;
    }

    public get token(): string {
        return this._token;
    }

    public set token(token: string) {
        this._token = token;
    }

    public get createdAt(): Date {
        return this._createdAt;
    }

    public set createdAt(createdAt: Date) {
        this._createdAt = createdAt;
    }
}

export const TokenModel = getModelForClass(Token);
