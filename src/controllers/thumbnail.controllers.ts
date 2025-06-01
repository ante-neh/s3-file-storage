import { Response } from "express";
import { asyncAwaitHandler } from "../middlewares/async.middleware";
import { Video } from "../models/video.models";
import { BadRequestError, CustomRequest, NotFoundError } from "../types";
import { deleteFileFromS3, generateRandom, invalidateCloudFrontCache, uploadFileToS3 } from "../utils/s3";

const uploadThumbnail = asyncAwaitHandler(async (req: CustomRequest, res: Response) => {
    const uploadedFile: Express.Multer.File | undefined = req.file && req.file 
    const { videoId } = req.params 

    if(!uploadedFile || !videoId) {
        throw new BadRequestError("Thumbnail and video id are required");
    }
    
    const fileName = generateRandom()
    await uploadFileToS3({ fileName, fileBuffer: uploadedFile.buffer, contentType: uploadedFile.mimetype })

    const thumbnailUrl = fileName
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


const deleteThumbnail = asyncAwaitHandler(async(req: CustomRequest, res: Response)=>{
    const { videoId } = req.params;
    if(!videoId){
        throw new BadRequestError("Video id is required");
    }

    const video = await Video.findById({ videoId }).select("-__v");
    if(!video){
        throw new NotFoundError("Vidoe not found");
    }

    await deleteFileFromS3(video.thumbnailUrl || "");
    await invalidateCloudFrontCache(video.thumbnailUrl || "");
    await video.deleteOne() 

    res.status(200).json({
        success: true,
        message: "Thumbnail deleted successfully",
    })
})

export { uploadThumbnail, deleteThumbnail }