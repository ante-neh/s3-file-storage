import { config } from 'dotenv';
import path from 'path';

config({path: path.resolve(process.cwd(), `.env.${process.env.NODE_ENV || 'development'}.local`)}) 

export const { DBURL, PORT, JWT_SECRET, JWT_EXPIRATION, NODE_ENV } = process.env; 