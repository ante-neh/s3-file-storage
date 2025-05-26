import { NextFunction, Request, Response } from "express";
import { BadRequestError, InvalidInputError, NotFoundError, UserForbiddenError, UserNotAuthenticatedError } from "../types";
import { formatError } from "../utils/errorFormater";
import { NODE_ENV } from "../config/env";

const errorMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
    let statusCode = 500;
    let message = "Internal Server Error";
    if(err instanceof BadRequestError || err instanceof InvalidInputError){
        statusCode = 400;
        message = err.message || "Bad Request";
    } else if(err instanceof UserNotAuthenticatedError){
        statusCode = 401;
        message = err.message || 'User not authenticated';
    } else if(err instanceof UserForbiddenError){
        statusCode = 403;
        message = err.message || 'User forbidden';
    } else if (err instanceof NotFoundError) {
        statusCode = 404;
        message = err.message || 'Not found';
    } else if( err instanceof Error){
        message = err.message;
    }

    if(statusCode >= 500){
        const errorMessage = formatError(err); 
        if(NODE_ENV === 'development'){
            console.error(errorMessage);
        }
    }

    res.status(statusCode).json({ 
        success: false, 
        message, 
        ...(NODE_ENV === 'development' && {stack: err.stack })
    })
} 

export { errorMiddleware };