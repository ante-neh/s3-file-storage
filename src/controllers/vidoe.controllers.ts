import { Response } from "express";
import mongoose from "mongoose";
import { CustomRequest, InvalidInputError, NotFoundError, UserNotAuthenticatedError } from "../types";
import { asyncAwaitHandler } from "../middlewares/async.middleware";
import { Video } from "../models/video.models";

const uploadVideo = asyncAwaitHandler(async(req: CustomRequest, res: Response) =>{
    const userId = req.user?.id;
    if(!userId){
        throw new UserNotAuthenticatedError("User not authenticated");
    }

    const { title, description } = req.body;
    if(!title || !description){
        throw new InvalidInputError("Title and description are required");
    }

    const video = await Video.create({
        title,
        description,
        user: userId,
    })

    res.status(201).json({
        success: true,
        message: "Video uploaded successfully",
        data: {
            video,
        }
    })
})

const getVideos = asyncAwaitHandler(async(req: CustomRequest, res: Response)=>{
    const userId = req.user?.id;
    if(!userId){
        throw new UserNotAuthenticatedError("User not authenticated");
    }

    const videos = await Video.find({ user: userId }).select("-__v");

    res.status(200).json({
        success: true,
        data: {
            videos,
        }
    })
})

const getVideo = asyncAwaitHandler(async(req: CustomRequest, res: Response)=>{
    const userId = req.user?.id;
    const { id: videoId } = req.params;
    if(!userId){
        throw new UserNotAuthenticatedError("User not authenticated");
    }

    if(!videoId || mongoose.Types.ObjectId.isValid(videoId)){
        throw new InvalidInputError("Invalid video ID");
    }

    const video = await Video.findOne({ _id: videoId, user: userId }).select("-__v");
    if(!video){
        throw new NotFoundError("Video not found");
    }

    res.status(200).json({
        success: true,
        data: {
            video,
        }
    })
}) 

export { uploadVideo, getVideos, getVideo };