import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { asyncAwaitHandler } from "../middlewares/async.middleware"; 
import { BadRequestError, InvalidInputError, IUser, NotFoundError } from "../types";
import { User } from "../models/user.models";
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from "../utils/jwthandler";
import { NODE_ENV } from "../config/env";
import { RefreshToken } from "../models/refresh.models";

const signIn = asyncAwaitHandler(async(req: Request, res: Response)=>{
    const { email, password } = req.body;
    if(!email || !password){
        throw new BadRequestError("Email and password are required");
    }

    const existingUser = await User.findOne({ email });
    if(!existingUser){
        throw new NotFoundError("User not found");
    }

    const isPasswordValid = await bcrypt.compare(password, existingUser?.password || '');
    if(!isPasswordValid){
        throw new InvalidInputError("Invalid password");
    }
     
    const token = generateAccessToken(existingUser?._id.toString() || '');
    const refreshToken = generateRefreshToken(existingUser?._id.toString())
    
    await RefreshToken.create({
        user: existingUser?._id.toString(),
        token: refreshToken,
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    })

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 30 * 24 * 60 * 60 * 1000
    })

    const { password: _, ...user } = existingUser.toObject() as IUser;

    return res.status(200).json({
        success: true,
        message: "User signed in successfully",
        data: {
            user,
            token
        }
    })
})

const signUp = asyncAwaitHandler(async(req: Request, res: Response)=>{
    const session = await User.startSession();
    session.startTransaction();

    try {
        const { name, email, password } = req.body;
    
        if(!name || !email || !password){
            throw new InvalidInputError("Please provide all required fields");
        }

        const existingUser = await User.findOne({ email });
        if(existingUser){
            throw new BadRequestError("User already exists");
        }
        
        
        const user = await User.create([{name, email, password }], { session});
        const token = generateAccessToken(user[0]._id.toString())
        const refreshToken = generateRefreshToken(user[0]._id.toString());
        
        await RefreshToken.create([{
            user: user[0]._id.toString(),
            token: refreshToken,
            expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
        }], { session})

        await session.commitTransaction();
        session.endSession();


        const { password: _, ...userWithoutPassword } = user[0].toObject() as IUser
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 30 * 24 * 60 * 60 * 1000
        }) 
    
        return res.status(201).json({
            success: true,
            message: "User signed up successfully",
            data: {
                user:userWithoutPassword,
                token
            }
        })

    } catch{
        await session.abortTransaction();
        session.endSession();
        throw new Error("An error occurred during sign up");
    }
})


const signOut = asyncAwaitHandler(async(req: Request, res: Response)=>{
    const { refreshToken } = req.cookies;
    if(!refreshToken){
        throw new BadRequestError("Refresh token is required");
    }

    await RefreshToken.findOneAndDelete({
        token: refreshToken
    });

    res.clearCookie("refreshToken");
    res.status(200).json({
        success: true,
        message: "User signed out successfully"
    })
})

const refreshToken = asyncAwaitHandler(async(req: Request, res: Response)=>{
    const { refreshToken } = req.cookies; 
    if(!refreshToken){
        throw new BadRequestError("Refresh token is required");
    }

    const id = verifyRefreshToken(refreshToken);
    if(!id){
        throw new InvalidInputError("Invalid refresh token");
    }

    const storedToken = await RefreshToken.findOne({ user: id, token: refreshToken });
    
    if (!storedToken || storedToken.revoked) {
        await RefreshToken.updateMany({user: id}, { revoked: true });
        throw new InvalidInputError("Refresh token compromised. Please sign in again.");
    }
    
    const user = await User.findById(id).select("-password");
    if(!user){
        throw new NotFoundError("User not found");
    }

    storedToken.revoked = true;
    await storedToken.save();

    const token = generateAccessToken(user._id.toString()); 
    const newRefreshToken = generateRefreshToken(user._id.toString());

    await RefreshToken.create({
        user: id,
        token: newRefreshToken,
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    });
    
    res.cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        secure: NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 30 * 24 * 60 * 60 * 1000
    })

    return res.status(200).json({
        success: true,
        message: "Token refreshed successfully",
        data: {
            user,
            token
        }
    })
})


export {
    signIn,
    signUp,
    signOut,
    refreshToken
}