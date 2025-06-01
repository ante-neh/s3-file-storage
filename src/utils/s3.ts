import {
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/cloudfront-signer";
import crypto from "crypto";
import { cloudFrontClient, S3Client } from "../config/s3";
import {
  S3_BUCKET_NAME,
  CLOUDFRONT_DISTRIBUTION_ID,
  CLOUDFRONT_KEY_PAIR_ID,
  CLOUDFRONT_PRIVATE_KEY,
  IMAGE_BASE_URL,
} from "../config/env";
import type { GetFile, UploadFile } from "../types";
import { CreateInvalidationCommand } from "@aws-sdk/client-cloudfront";

const uploadFileToS3 = async ({
  fileName,
  fileBuffer,
  contentType,
}: UploadFile) => {
  const command = new PutObjectCommand({
    Bucket: S3_BUCKET_NAME as string,
    Key: fileName,
    Body: fileBuffer,
    ContentType: contentType,
  });

  try {
    await S3Client.send(command);
  } catch (e) {
    console.error("Failed to upload file to s3", e);
    throw new Error("Unable to upload file to s3");
  }
};

const deleteFileFromS3 = async (fileName: string) => {
  const command = new DeleteObjectCommand({
    Bucket: S3_BUCKET_NAME as string,
    Key: fileName,
  });
  try {
    await S3Client.send(command);
  } catch (e) {
    console.error("Failed to delete file from s3", e);
    throw new Error("Failed to delete file from s3");
  }
};

const getFileCloudFront = ({ fileName, expiresIn = 3600 }: GetFile) => {
  try {
    const res = getSignedUrl({
      url: (IMAGE_BASE_URL as string) + fileName,
      privateKey: CLOUDFRONT_PRIVATE_KEY as string,
      keyPairId: CLOUDFRONT_KEY_PAIR_ID as string,
      dateLessThan: expiresIn,
    });
    return res;
  } catch (e) {
    console.error("Failed to generate signed url", e);
    throw new Error("Failed to generate signed url");
  }
};

const invalidateCloudFrontCache = async (fileName: string) => {
  const command = new CreateInvalidationCommand({
    DistributionId: CLOUDFRONT_DISTRIBUTION_ID as string,
    InvalidationBatch: {
      CallerReference: fileName,
      Paths: {
        Quantity: 1,
        Items: ["/" + fileName],
      },
    },
  });

  try {
    await cloudFrontClient.send(command);
  } catch (e) {
    console.error("Failed to invalidate cloud front");
    throw new Error("Faild to invalidate cloud front");
  }
};

const generateRandom = (bytes = 32) => {
  return crypto.randomBytes(bytes).toString("hex");
};

export {
  uploadFileToS3,
  deleteFileFromS3,
  getFileCloudFront,
  invalidateCloudFrontCache,
  generateRandom,
};
