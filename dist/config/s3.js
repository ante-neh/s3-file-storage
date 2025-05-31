"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.S3Client = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const env_1 = require("./env");
exports.S3Client = new client_s3_1.S3({
    region: env_1.S3_REGION,
    credentials: {
        accessKeyId: env_1.S3_ACCESS_KEY,
        secretAccessKey: env_1.S3_SECRET_ACCESS_KEY
    }
});
