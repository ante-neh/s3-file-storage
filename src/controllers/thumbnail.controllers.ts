import { Response } from "express";
import { asyncAwaitHandler } from "../middlewares/async.middleware";
import { Video } from "../models/video.models";
import { BadRequestError, CustomRequest } from "../types";
import { generateRandom, getFileFromS3, uploadFileToS3 } from "../utils/s3";

const uploadThumbnail = asyncAwaitHandler(async (req: CustomRequest, res: Response) => {
    const uploadedFile: Express.Multer.File | undefined = req.file && req.file 
    const { videoId } = req.params 

    if(!uploadedFile || !videoId) {
        throw new BadRequestError("Thumbnail and video id are required");
    }
    
    const fileName = generateRandom()
    await uploadFileToS3({ fileName, fileBuffer: uploadedFile.buffer, contentType: uploadedFile.mimetype })

    const thumbnailUrl = await getFileFromS3({ fileName, expiresIn: 60 * 60 * 24 * 7 })
    if(!thumbnailUrl){
        throw new Error("Internal server error")
    }
    const video = await Video.findById(videoId).select("-__v")
    
    if(!video){
        throw new BadRequestError("Video doesn't exist")
    }

    video.thumbnailUrl = thumbnailUrl
    await video.save()

    return res.status(201).json({
        success: true,
        message: "Thumbnail uploaded successfully",
        data: {
            video
        }
    })
})

export { uploadThumbnail }