"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.IMAGE_BASE_URL = exports.CLOUDFRONT_KEY_PAIR_ID = exports.CLOUDFRONT_PRIVATE_KEY = exports.CLOUDFRONT_DISTRIBUTION_ID = exports.S3_BUCKET_NAME = exports.S3_REGION = exports.S3_SECRET_ACCESS_KEY = exports.S3_ACCESS_KEY = exports.JWT_REFRESH_EXPIRATION = exports.JWT_REFRESH_SECRET = exports.JWT_EXPIRATION = exports.MONGO_CONN = exports.JWT_SECRET = exports.NODE_ENV = exports.PORT = void 0;
const dotenv_1 = require("dotenv");
const path_1 = __importDefault(require("path"));
(0, dotenv_1.config)({
    path: path_1.default.resolve(process.cwd(), `.env.${process.env.NODE_ENV || "development"}.local`),
});
_a = process.env, exports.PORT = _a.PORT, exports.NODE_ENV = _a.NODE_ENV, exports.JWT_SECRET = _a.JWT_SECRET, exports.MONGO_CONN = _a.MONGO_CONN, exports.JWT_EXPIRATION = _a.JWT_EXPIRATION, exports.JWT_REFRESH_SECRET = _a.JWT_REFRESH_SECRET, exports.JWT_REFRESH_EXPIRATION = _a.JWT_REFRESH_EXPIRATION, exports.S3_ACCESS_KEY = _a.S3_ACCESS_KEY, exports.S3_SECRET_ACCESS_KEY = _a.S3_SECRET_ACCESS_KEY, exports.S3_REGION = _a.S3_REGION, exports.S3_BUCKET_NAME = _a.S3_BUCKET_NAME, exports.CLOUDFRONT_DISTRIBUTION_ID = _a.CLOUDFRONT_DISTRIBUTION_ID, exports.CLOUDFRONT_PRIVATE_KEY = _a.CLOUDFRONT_PRIVATE_KEY, exports.CLOUDFRONT_KEY_PAIR_ID = _a.CLOUDFRONT_KEY_PAIR_ID, exports.IMAGE_BASE_URL = _a.IMAGE_BASE_URL;
