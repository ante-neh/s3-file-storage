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
exports.generateRandom = exports.getFileFromS3 = exports.deleteFileFromS3 = exports.uploadFileToS3 = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
const crypto_1 = __importDefault(require("crypto"));
const s3_1 = require("../config/s3");
const env_1 = require("../config/env");
const uploadFileToS3 = (_a) => __awaiter(void 0, [_a], void 0, function* ({ fileName, fileBuffer, contentType }) {
    const command = new client_s3_1.PutObjectCommand({
        Bucket: env_1.S3_BUCKET_NAME,
        Key: fileName,
        Body: fileBuffer,
        ContentType: contentType
    });
    try {
        const res = yield s3_1.S3Client.send(command);
        return res;
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
        Key: fileName
    });
    try {
        const res = yield s3_1.S3Client.send(command);
        return res;
    }
    catch (e) {
        console.error("Failed to delete file from s3", e);
        throw new Error("Failed to delete file from s3");
    }
});
exports.deleteFileFromS3 = deleteFileFromS3;
const getFileFromS3 = (_a) => __awaiter(void 0, [_a], void 0, function* ({ fileName, expiresIn = 3600 }) {
    const command = new client_s3_1.GetObjectCommand({
        Bucket: env_1.S3_BUCKET_NAME,
        Key: fileName
    });
    try {
        const signedUrl = yield (0, s3_request_presigner_1.getSignedUrl)(s3_1.S3Client, command, { expiresIn });
        return signedUrl;
    }
    catch (e) {
        console.error("Failed to generate signed url", e);
    }
});
exports.getFileFromS3 = getFileFromS3;
const generateRandom = (bytes = 32) => {
    return crypto_1.default.randomBytes(bytes).toString("hex");
};
exports.generateRandom = generateRandom;
