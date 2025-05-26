"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const types_1 = require("../types");
const jwthandler_1 = require("../utils/jwthandler");
const authMiddleware = (req, res, next) => {
    let token = "";
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
    }
    else {
        throw new types_1.UserNotAuthenticatedError("No token provided");
    }
    try {
        const user = (0, jwthandler_1.verifyAccessToken)(token);
        if (!user || !user.id) {
            throw new types_1.UserNotAuthenticatedError("Invalid token");
        }
        req.user = user;
        next();
    }
    catch (err) {
        throw new types_1.UserNotAuthenticatedError("Invalid token");
    }
};
exports.authMiddleware = authMiddleware;
