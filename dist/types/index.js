"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidInputError = exports.NotFoundError = exports.UserForbiddenError = exports.UserNotAuthenticatedError = exports.BadRequestError = void 0;
class BadRequestError extends Error {
    constructor(message) {
        super(message);
    }
}
exports.BadRequestError = BadRequestError;
class UserNotAuthenticatedError extends Error {
    constructor(message) {
        super(message);
    }
}
exports.UserNotAuthenticatedError = UserNotAuthenticatedError;
class UserForbiddenError extends Error {
    constructor(message) {
        super(message);
    }
}
exports.UserForbiddenError = UserForbiddenError;
class NotFoundError extends Error {
    constructor(message) {
        super(message);
    }
}
exports.NotFoundError = NotFoundError;
class InvalidInputError extends Error {
    constructor(message) {
        super(message);
    }
}
exports.InvalidInputError = InvalidInputError;
