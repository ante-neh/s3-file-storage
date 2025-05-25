import { Request } from "express";
import { JwtPayload } from 'jsonwebtoken';

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

export { 
    BadRequestError, 
    UserNotAuthenticatedError, 
    UserForbiddenError, 
    NotFoundError, 
    CustomRequest, 
    CustomJwtPayload 
};