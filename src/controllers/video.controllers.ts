import { Response } from "express";
import mongoose from "mongoose";
import { CustomRequest, InvalidInputError, IVideoPopulated, NotFoundError, UserNotAuthenticatedError } from "../types";
import { asyncAwaitHandler } from "../middlewares/async.middleware";
import { Video } from "../models/video.models";
import { getFileCloudFront } from "../utils/s3";

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

    const page = Math.max(1, parseInt(req.query.page as string) || 1);
    const limit = Math.min(100, parseInt(req.query.limit as string) || 10);
    const skip = (page - 1) * limit;

    let [ videos, totalVidoes ] = await Promise.all([
        Video.find({ user: userId})
        .select("-__v")
        .populate<{ user: {name: string, email: string }}>("user", "name email")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean<IVideoPopulated[]>(),
        Video.countDocuments({ user: userId})
    ])

    videos = videos.map((video)=>(
        {
            ...video,
            thumbnailUrl: getFileCloudFront({ fileName: video.thumbnailUrl || "" }),
        }
    ))

    res.status(200).json({
        success: true,
        data: {
            videos,
        },
        pagination: {
            total: totalVidoes,
            page,
            limit,
            pages: Math.ceil(totalVidoes / limit),
        }
    })
})

const getVideo = asyncAwaitHandler(async(req: CustomRequest, res: Response)=>{
    const userId = req.user?.id;
    const { id: videoId } = req.params;
    if(!userId){
        throw new UserNotAuthenticatedError("User not authenticated");
    }

    if(!videoId || !mongoose.Types.ObjectId.isValid(videoId)){
        throw new InvalidInputError("Invalid video ID");
    }

    const video = await Video.findOne({ _id: videoId, user: userId }).select("-__v");
    if(!video){
        throw new NotFoundError("Video not found");
    }

    video.thumbnailUrl = getFileCloudFront({ fileName: video.thumbnailUrl || "" })

    res.status(200).json({
        success: true,
        data: {
            video,
        }
    })
}) 

export { uploadVideo, getVideos, getVideo };