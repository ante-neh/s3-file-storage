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
exports.getVideo = exports.getVideos = exports.uploadVideo = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const types_1 = require("../types");
const async_middleware_1 = require("../middlewares/async.middleware");
const video_models_1 = require("../models/video.models");
const uploadVideo = (0, async_middleware_1.asyncAwaitHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    if (!userId) {
        throw new types_1.UserNotAuthenticatedError("User not authenticated");
    }
    const { title, description } = req.body;
    if (!title || !description) {
        throw new types_1.InvalidInputError("Title and description are required");
    }
    const video = yield video_models_1.Video.create({
        title,
        description,
        user: userId,
    });
    res.status(201).json({
        success: true,
        message: "Video uploaded successfully",
        data: {
            video,
        }
    });
}));
exports.uploadVideo = uploadVideo;
const getVideos = (0, async_middleware_1.asyncAwaitHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    if (!userId) {
        throw new types_1.UserNotAuthenticatedError("User not authenticated");
    }
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(100, parseInt(req.query.limit) || 10);
    const skip = (page - 1) * limit;
    const [videos, totalVidoes] = yield Promise.all([
        video_models_1.Video.find({ user: userId })
            .select("-__v")
            .populate("user", "name email")
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .lean(),
        video_models_1.Video.countDocuments({ user: userId })
    ]);
    res.status(200).json({
        success: true,
        data: {
            videos,
        },
        pagination: {
            total: totalVidoes,
            page,
            limit,
            pages: Math.ceil(totalVidoes / limit),
        }
    });
}));
exports.getVideos = getVideos;
const getVideo = (0, async_middleware_1.asyncAwaitHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    const { id: videoId } = req.params;
    if (!userId) {
        throw new types_1.UserNotAuthenticatedError("User not authenticated");
    }
    if (!videoId || !mongoose_1.default.Types.ObjectId.isValid(videoId)) {
        throw new types_1.InvalidInputError("Invalid video ID");
    }
    const video = yield video_models_1.Video.findOne({ _id: videoId, user: userId }).select("-__v");
    if (!video) {
        throw new types_1.NotFoundError("Video not found");
    }
    res.status(200).json({
        success: true,
        data: {
            video,
        }
    });
}));
exports.getVideo = getVideo;
