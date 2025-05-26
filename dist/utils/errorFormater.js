"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatError = void 0;
const formatError = (error) => {
    if (typeof error === 'string')
        return error;
    if (error instanceof Error)
        return error.message;
    return 'unknown error occurred';
};
exports.formatError = formatError;
