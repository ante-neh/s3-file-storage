import { Request } from "express";
import { JwtPayload } from 'jsonwebtoken';
import mongoose, { Date, Document, Schema } from "mongoose";

interface CustomJwtPayload extends JwtPayload {
  id: string;
}

interface CustomRequest extends Request {
  user?: CustomJwtPayload;
}

class BadRequestError extends Error {
    constructor(message: string){
        super(message);
    }
}

class UserNotAuthenticatedError extends Error {
    constructor(message: string){
        super(message);
    }
} 

class UserForbiddenError extends Error {
    constructor(message: string){
        super(message);
    }
}

class NotFoundError extends Error {
    constructor(message: string){
        super(message);
    }
}

class InvalidInputError extends Error {
    constructor(message: string){
        super(message);
    }
}
interface IUser extends Document {
    _id: Schema.Types.ObjectId;
    name: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}

interface IVideo extends Document {
    _id: Schema.Types.ObjectId;
    title: string;
    description: string;
    thumbnailUrl?: string;
    videoUrl?:string;
    user: Schema.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}
interface IVideoPopulated extends Omit<IVideo, "user"> {
  user: { 
    _id: mongoose.Types.ObjectId; 
    name: string; 
    email: string 
  };
}

interface IRefreshToken extends Document {
    _id: Schema.Types.ObjectId;
    user: Schema.Types.ObjectId;
    token: string;
    createdAt: Date;
    updatedAt: Date;
    expiresAt: Date;
    revoked?: boolean;
}

export { 
    BadRequestError, 
    UserNotAuthenticatedError, 
    UserForbiddenError, 
    NotFoundError,
    InvalidInputError,
    CustomRequest, 
    CustomJwtPayload,
    IUser,
    IVideo,
    IVideoPopulated,
    IRefreshToken
};