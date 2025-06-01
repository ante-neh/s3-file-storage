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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteThumbnail = exports.uploadThumbnail = void 0;
const async_middleware_1 = require("../middlewares/async.middleware");
const video_models_1 = require("../models/video.models");
const types_1 = require("../types");
const s3_1 = require("../utils/s3");
const uploadThumbnail = (0, async_middleware_1.asyncAwaitHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const uploadedFile = req.file && req.file;
    const { videoId } = req.params;
    if (!uploadedFile || !videoId) {
        throw new types_1.BadRequestError("Thumbnail and video id are required");
    }
    const fileName = (0, s3_1.generateRandom)();
    yield (0, s3_1.uploadFileToS3)({ fileName, fileBuffer: uploadedFile.buffer, contentType: uploadedFile.mimetype });
    const thumbnailUrl = fileName;
    const video = yield video_models_1.Video.findById(videoId).select("-__v");
    if (!video) {
        throw new types_1.BadRequestError("Video doesn't exist");
    }
    video.thumbnailUrl = thumbnailUrl;
    yield video.save();
    return res.status(201).json({
        success: true,
        message: "Thumbnail uploaded successfully",
        data: {
            video
        }
    });
}));
exports.uploadThumbnail = uploadThumbnail;
const deleteThumbnail = (0, async_middleware_1.asyncAwaitHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { videoId } = req.params;
    if (!videoId) {
        throw new types_1.BadRequestError("Video id is required");
    }
    const video = yield video_models_1.Video.findById({ videoId }).select("-__v");
    if (!video) {
        throw new types_1.NotFoundError("Vidoe not found");
    }
    yield (0, s3_1.deleteFileFromS3)(video.thumbnailUrl || "");
    yield (0, s3_1.invalidateCloudFrontCache)(video.thumbnailUrl || "");
    yield video.deleteOne();
    res.status(200).json({
        success: true,
        message: "Thumbnail deleted successfully",
    });
}));
exports.deleteThumbnail = deleteThumbnail;
