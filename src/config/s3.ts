import { S3 } from "@aws-sdk/client-s3"; 
import { S3_ACCESS_KEY, S3_SECRET_ACCESS_KEY, S3_REGION } from "./env";
import { CloudFrontClient } from "@aws-sdk/client-cloudfront";

const S3Client = new S3({
    region: S3_REGION as string,
    credentials:{
        accessKeyId:S3_ACCESS_KEY as string,
        secretAccessKey:S3_SECRET_ACCESS_KEY as string
    }
})

const cloudFrontClient = new CloudFrontClient({
    credentials:{
        accessKeyId: S3_ACCESS_KEY as string,
        secretAccessKey: S3_SECRET_ACCESS_KEY as string
    }
}) 

export { S3Client, cloudFrontClient }