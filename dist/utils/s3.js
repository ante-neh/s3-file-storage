"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRandom = exports.invalidateCloudFrontCache = exports.getFileCloudFront = exports.deleteFileFromS3 = exports.uploadFileToS3 = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const cloudfront_signer_1 = require("@aws-sdk/cloudfront-signer");
const crypto_1 = __importDefault(require("crypto"));
const s3_1 = require("../config/s3");
const env_1 = require("../config/env");
const client_cloudfront_1 = require("@aws-sdk/client-cloudfront");
const uploadFileToS3 = (_a) => __awaiter(void 0, [_a], void 0, function* ({ fileName, fileBuffer, contentType, }) {
    const command = new client_s3_1.PutObjectCommand({
        Bucket: env_1.S3_BUCKET_NAME,
        Key: fileName,
        Body: fileBuffer,
        ContentType: contentType,
    });
    try {
        yield s3_1.S3Client.send(command);
    }
    catch (e) {
        console.error("Failed to upload file to s3", e);
        throw new Error("Unable to upload file to s3");
    }
});
exports.uploadFileToS3 = uploadFileToS3;
const deleteFileFromS3 = (fileName) => __awaiter(void 0, void 0, void 0, function* () {
    const command = new client_s3_1.DeleteObjectCommand({
        Bucket: env_1.S3_BUCKET_NAME,
        Key: fileName,
    });
    try {
        yield s3_1.S3Client.send(command);
    }
    catch (e) {
        console.error("Failed to delete file from s3", e);
        throw new Error("Failed to delete file from s3");
    }
});
exports.deleteFileFromS3 = deleteFileFromS3;
const getFileCloudFront = ({ fileName, expiresIn = 3600 }) => {
    try {
        const res = (0, cloudfront_signer_1.getSignedUrl)({
            url: env_1.IMAGE_BASE_URL + fileName,
            privateKey: env_1.CLOUDFRONT_PRIVATE_KEY,
            keyPairId: env_1.CLOUDFRONT_KEY_PAIR_ID,
            dateLessThan: expiresIn,
        });
        return res;
    }
    catch (e) {
        console.error("Failed to generate signed url", e);
        throw new Error("Failed to generate signed url");
    }
};
exports.getFileCloudFront = getFileCloudFront;
const invalidateCloudFrontCache = (fileName) => __awaiter(void 0, void 0, void 0, function* () {
    const command = new client_cloudfront_1.CreateInvalidationCommand({
        DistributionId: env_1.CLOUDFRONT_DISTRIBUTION_ID,
        InvalidationBatch: {
            CallerReference: fileName,
            Paths: {
                Quantity: 1,
                Items: ["/" + fileName],
            },
        },
    });
    try {
        yield s3_1.cloudFrontClient.send(command);
    }
    catch (e) {
        console.error("Failed to invalidate cloud front");
        throw new Error("Faild to invalidate cloud front");
    }
});
exports.invalidateCloudFrontCache = invalidateCloudFrontCache;
const generateRandom = (bytes = 32) => {
    return crypto_1.default.randomBytes(bytes).toString("hex");
};
exports.generateRandom = generateRandom;
