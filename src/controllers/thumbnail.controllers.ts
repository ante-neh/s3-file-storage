import { Response } from "express";
import { asyncAwaitHandler } from "../middlewares/async.middleware";
import { Video } from "../models/video.models";
import { BadRequestError, CustomRequest } from "../types";

const uploadThumbnail = asyncAwaitHandler(async (req: CustomRequest, res: Response) => {
    const uploadedFile: Express.Multer.File | undefined = req.file && req.file 
    const { videoId } = req.params 

    if(!uploadedFile){
        throw new BadRequestError("No thumbnail uploaded");
    }

    const fileName = uploadedFile.filename 
    if(!fileName){
        console.log("file uploaded successfully but unable to access filename", fileName)
        throw new Error("Error processing uploaded file: filename not found")
    }

    const serverBaseUrl = `${req.protocol}://${req.get("host")}`
    const thumbnailUrl = `${serverBaseUrl}/assets/${fileName}`
    const existingVideo = await Video.findById(videoId)
    
    if(!existingVideo){
        throw new BadRequestError("Video doesn't exist")
    }

    existingVideo.thumbnailUrl = thumbnailUrl
    await existingVideo.save()

    return res.status(201).json({
        success: true,
        message: "Thumbnail uploaded successfully",
        data: {
            video: existingVideo
        }
    })
})

export { uploadThumbnail }