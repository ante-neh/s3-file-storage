import express from 'express';
import helmet from 'helmet'; 
import cors from 'cors' 
import { videoRouter } from './routes/video.routes';
import { userRouter } from './routes/user.routes';
import { errorMiddleware } from './middlewares/error.middleware';
import { authRouter } from './routes/auth.routes';
import { thumbnailRouter } from './routes/thumbnail.routes';

const app = express();
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/api/v1/videos", videoRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/thumbnails", thumbnailRouter);
app.use(errorMiddleware);

export { app };