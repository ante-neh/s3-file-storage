import { config } from 'dotenv';
import path from 'path';

config({path: path.resolve(process.cwd(), `.env.${process.env.NODE_ENV || 'development'}.local`)}) 

export const { MONGO_CONN, PORT, JWT_SECRET, JWT_EXPIRATION, NODE_ENV, JWT_REFRESH_SECRET, JWT_REFRESH_EXPIRATION, S3_ACCESS_KEY, S3_SECRET_ACCESS_KEY, S3_REGION, S3_BUCKET_NAME } = process.env; 