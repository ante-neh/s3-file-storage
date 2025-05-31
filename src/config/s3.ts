import { S3 } from "@aws-sdk/client-s3"; 
import { S3_ACCESS_KEY, S3_SECRET_ACCESS_KEY, S3_REGION } from "./env";

export const S3Client = new S3({
    region: S3_REGION as string,
    credentials:{
        accessKeyId:S3_ACCESS_KEY as string,
        secretAccessKey:S3_SECRET_ACCESS_KEY as string
    }
})