import { Router } from 'express'
const videoRouter = Router()

videoRouter.get("/videos", (req, res)=>{
    console.log("Fetching all videos")
})

videoRouter.get("/videos/:id", (req, res)=>{
    console.log(`Fetching video with ID: ${req.params.id}`)
})


export { videoRouter }