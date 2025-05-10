import { NextFunction, Request, Response } from "express";
import { BadRequestError, NotFoundError, UserForbiddenError, UserNotAuthenticatedError } from "../types/errors";
import { respondWithJSON } from "../utils/responseWithJson";

export function errorHandlingMiddleware( err: unknown, req: Request, res: Response, next: NextFunction ){
    let statusCode = 500;
    let message = "Something went wrong on our end";
  
    if (err instanceof BadRequestError) {
      statusCode = 400;
      message = err.message;
    } else if (err instanceof UserNotAuthenticatedError) {
      statusCode = 401;
      message = err.message;
    } else if (err instanceof UserForbiddenError) {
      statusCode = 403;
      message = err.message;
    } else if (err instanceof NotFoundError) {
      statusCode = 404;
      message = err.message;
    }
  
    if (statusCode >= 500) {
      const errStr = errStringFromError(err);
      if (process.env.NODE_ENV === "dev") {
        message = errStr;
      }
      console.log(errStr);
    }
  
    respondWithJSON(res, statusCode, { error: message });
  }
  
  function errStringFromError(err: unknown) {
    if (typeof err === "string") return err;
    if (err instanceof Error) return err.message;
    return "An unknown error occurred";
  }