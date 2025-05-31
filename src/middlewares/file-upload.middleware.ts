import { Request } from 'express'
import multer from 'multer' 

const storage = multer.memoryStorage();

const fileFilter = function(req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback){
    if(file.mimetype.startsWith("image/")){
        return cb(null, true)
    }else{
        return cb(new Error("Only images are allowed"))
    }
}

const upload = multer({ storage, fileFilter, limits: { fileSize: 10 * 1024 * 1024 } })

export const fileUploadMiddleware = upload.single("thumbnail")