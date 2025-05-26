import { Response } from "express";
import mongoose from "mongoose";
import { asyncAwaitHandler } from "../middlewares/async.middleware";
import { BadRequestError, CustomRequest, NotFoundError, UserForbiddenError, UserNotAuthenticatedError } from "../types";
import { User } from "../models/user.models";

const getUser = asyncAwaitHandler(async(req: CustomRequest, res: Response)=>{
    const { id: userId } = req.params;
    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
        throw new BadRequestError("Valid user ID is required");
    }

    if (!req.user) {
        throw new NotFoundError("User not authenticated");
    }

    if(req.user?.id !== userId){
        throw new UserForbiddenError("Access denied, you can only access your own profile")
    }
    
    const user = await User.findById(userId).select("-password -__v");
    if(!user){
        throw new NotFoundError("User not found");
    }

    return res.status(200).json({
        success: true,
        data: {
            user
        }
    })
})

export { getUser }