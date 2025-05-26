"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.asyncAwaitHandler = void 0;
const asyncAwaitHandler = (fn) => (req, res, next) => {
    return Promise.resolve(fn(req, res, next)).catch(next);
};
exports.asyncAwaitHandler = asyncAwaitHandler;
