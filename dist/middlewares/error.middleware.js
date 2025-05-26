"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = void 0;
const types_1 = require("../types");
const errorFormater_1 = require("../utils/errorFormater");
const env_1 = require("../config/env");
const errorMiddleware = (err, req, res, next) => {
    let statusCode = 500;
    let message = "Internal Server Error";
    if (err instanceof types_1.BadRequestError || err instanceof types_1.InvalidInputError) {
        statusCode = 400;
        message = err.message || "Bad Request";
    }
    else if (err instanceof types_1.UserNotAuthenticatedError) {
        statusCode = 401;
        message = err.message || 'User not authenticated';
    }
    else if (err instanceof types_1.UserForbiddenError) {
        statusCode = 403;
        message = err.message || 'User forbidden';
    }
    else if (err instanceof types_1.NotFoundError) {
        statusCode = 404;
        message = err.message || 'Not found';
    }
    else if (err instanceof Error) {
        message = err.message;
    }
    if (statusCode >= 500) {
        const errorMessage = (0, errorFormater_1.formatError)(err);
        if (env_1.NODE_ENV === 'development') {
            console.error(errorMessage);
        }
    }
    res.status(statusCode).json(Object.assign({ success: false, message }, (env_1.NODE_ENV === 'development' && { stack: err.stack })));
};
exports.errorMiddleware = errorMiddleware;
