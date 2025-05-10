"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const asyncAwaitHandler = (fn) => (req, res, next) => {
    return Promise.resolve(fn(req, res)).catch(next);
};
exports.default = asyncAwaitHandler;
