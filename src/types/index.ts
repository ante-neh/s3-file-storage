import { Request } from "express";
import { JwtPayload } from 'jsonwebtoken';
import { Date, Document, Schema } from "mongoose";

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

interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}

interface IVideo extends Document {
    _id: string;
    title: string;
    description: string;
    thumbnailUrl?: string;
    videoUrl?:string;
    user: Schema.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

export { 
    BadRequestError, 
    UserNotAuthenticatedError, 
    UserForbiddenError, 
    NotFoundError, 
    CustomRequest, 
    CustomJwtPayload,
    IUser,
    IVideo
};