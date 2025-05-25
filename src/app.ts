import express from 'express';
import helmet from 'helmet'; 
import cors from 'cors' 
import { videosRouter } from './routes/video.routes';
import { usersRouter } from './routes/user.routes';
import { errorMiddleware } from './middlewares/error.middleware';

const app = express();
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/api/v1", videosRouter);
app.use("/api/v1", usersRouter);
app.use(errorMiddleware);

export { app };