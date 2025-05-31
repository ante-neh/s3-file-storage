import { Request } from 'express'
import multer from 'multer' 
import fs from 'fs'
import path from 'path'


const storage = multer.diskStorage({
    destination: function(req: Request, file: Express.Multer.File, cb){
        const dir = "assets"
        if(!fs.existsSync(dir)){
            fs.mkdirSync(dir)
        }
        cb(null, dir)
    },
    filename(req, file, callback) {
        const { videoId } = req.params
        callback(null, videoId + path.extname(file.originalname))
    },
})

const fileFilter = function(req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback){
    if(file.mimetype.startsWith("image/")){
        return cb(null, true)
    }else{
        return cb(new Error("Only images are allowed"))
    }
}

const upload = multer({ storage, fileFilter, limits: { fileSize: 10 * 1024 * 1024 } })

export const fileUploadMiddleware = upload.single("thumbnail")