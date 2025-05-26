import { NextFunction, Response } from "express";
import { CustomRequest, UserNotAuthenticatedError } from "../types";
import { verifyAccessToken } from "../utils/jwthandler";

const authMiddleware = (req: CustomRequest, res: Response, next: NextFunction ) => {
    let token = "";
    if ( req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    } else {
      throw new UserNotAuthenticatedError("No token provided");
    }

    try {
      const user = verifyAccessToken(token);
      if (!user || !user.id) {
        throw new UserNotAuthenticatedError("Invalid token");
      }
      req.user = user;
      next();
    } catch (err) {
      throw new UserNotAuthenticatedError("Invalid token");
    }
};

export { authMiddleware };
