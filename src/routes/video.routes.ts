import { Router } from 'express'
import { getVideo, getVideos, uploadVideo } from '../controllers/video.controllers'
import { authMiddleware } from '../middlewares/auth.middleware'

const videoRouter = Router()

videoRouter.get("/", authMiddleware, getVideos) 
videoRouter.get("/:id",authMiddleware,  getVideo)
videoRouter.post("/", authMiddleware, uploadVideo) 

export { videoRouter }