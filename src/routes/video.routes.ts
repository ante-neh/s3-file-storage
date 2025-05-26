import { Router } from 'express'
import { getVideo, getVideos, uploadVideo } from '../controllers/vidoe.controllers'
import { authMiddleware } from '../middlewares/auth.middleware'

const videoRouter = Router()

videoRouter.get("/videos", authMiddleware, getVideos) 
videoRouter.get("/videos/:id",authMiddleware,  getVideo)
videoRouter.post("/videos", authMiddleware, uploadVideo) 

export { videoRouter }