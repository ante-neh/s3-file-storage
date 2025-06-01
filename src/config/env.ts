import { config } from "dotenv";
import path from "path";

config({
  path: path.resolve(
    process.cwd(),
    `.env.${process.env.NODE_ENV || "development"}.local`
  ),
});

export const {
    PORT,
    NODE_ENV,
    JWT_SECRET,
    MONGO_CONN,
    JWT_EXPIRATION,
    JWT_REFRESH_SECRET,
    JWT_REFRESH_EXPIRATION,
    S3_ACCESS_KEY,
    S3_SECRET_ACCESS_KEY,
    S3_REGION,
    S3_BUCKET_NAME,
    CLOUDFRONT_DISTRIBUTION_ID,
    CLOUDFRONT_PRIVATE_KEY,
    CLOUDFRONT_KEY_PAIR_ID,
    IMAGE_BASE_URL
} = process.env;
