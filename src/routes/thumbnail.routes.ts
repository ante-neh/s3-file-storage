import { Router } from 'express'; 
import { deleteThumbnail, uploadThumbnail } from '../controllers/thumbnail.controllers';
import { authMiddleware } from '../middlewares/auth.middleware';
import { fileUploadMiddleware } from '../middlewares/file-upload.middleware';

const thumbnailRouter = Router();

thumbnailRouter.post('/:videoId',authMiddleware, fileUploadMiddleware, uploadThumbnail);
thumbnailRouter.delete('/:videoId', authMiddleware, deleteThumbnail);

export { thumbnailRouter };