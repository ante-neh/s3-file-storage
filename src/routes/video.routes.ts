import { Router } from 'express'
const videosRouter = Router()

videosRouter.get("/videos", (req, res)=>{
    console.log("Fetching all videos")
})

videosRouter.get("/videos/:id", (req, res)=>{
    console.log(`Fetching video with ID: ${req.params.id}`)
})


export { videosRouter }