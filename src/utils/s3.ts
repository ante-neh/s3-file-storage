import { DeleteObjectCommand, GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import crypto from 'crypto'
import { S3Client } from "../config/s3"; 
import { S3_BUCKET_NAME } from '../config/env';
import type { GetFile, UploadFile } from "../types";

const uploadFileToS3 = async({ fileName, fileBuffer, contentType }: UploadFile)=>{
    const command = new PutObjectCommand({
        Bucket: S3_BUCKET_NAME as string,
        Key: fileName,
        Body: fileBuffer,
        ContentType: contentType
    })

    try{
        const res = await S3Client.send(command);
        return res
    }catch(e){
        console.error("Failed to upload file to s3", e);
        throw new Error("Unable to upload file to s3")
    }
}

const deleteFileFromS3 = async(fileName:string)=>{
    const command = new DeleteObjectCommand({
        Bucket: S3_BUCKET_NAME as string,
        Key: fileName
    })
    try{
        const res = await S3Client.send(command);
        return res
    }catch(e){
        console.error("Failed to delete file from s3", e);
        throw new Error("Failed to delete file from s3")
    }
}

const getFileFromS3 = async({fileName, expiresIn = 3600}: GetFile)=>{
    const command = new GetObjectCommand({
        Bucket: S3_BUCKET_NAME as string,
        Key: fileName
    })
    try{
        const signedUrl = await getSignedUrl(S3Client, command, { expiresIn });
        return signedUrl
    }catch(e){
        console.error("Failed to generate signed url", e);
    }
}

const generateRandom = (bytes=32)=>{
    return crypto.randomBytes(bytes).toString("hex");

}

export { uploadFileToS3, deleteFileFromS3, getFileFromS3, generateRandom };