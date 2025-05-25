import { NextFunction, Response } from "express";
import { CustomRequest, UserNotAuthenticatedError } from "../types";
import { verifyToken } from "../utils/jwthandler";

const authMiddleware = (req: CustomRequest, res: Response, next: NextFunction ) => {
    let token = "";
    if ( req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    } else {
      return next(new UserNotAuthenticatedError("No token provided"));
    }

    try {
      const user = verifyToken(token);
      if (!user || !user.id) {
        return next(new UserNotAuthenticatedError("Invalid token"));
      }
      req.user = user;
      next();
    } catch (err) {
      return next(new UserNotAuthenticatedError("Invalid token"));
    }
};

export { authMiddleware };
