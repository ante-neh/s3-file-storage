"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileUploadMiddleware = void 0;
const multer_1 = __importDefault(require("multer"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        const dir = "assets";
        if (!fs_1.default.existsSync(dir)) {
            fs_1.default.mkdirSync(dir);
        }
        cb(null, dir);
    },
    filename(req, file, callback) {
        const { videoId } = req.params;
        callback(null, videoId + path_1.default.extname(file.originalname));
    },
});
const fileFilter = function (req, file, cb) {
    if (file.mimetype.startsWith("image/")) {
        return cb(null, true);
    }
    else {
        return cb(new Error("Only images are allowed"));
    }
};
const upload = (0, multer_1.default)({ storage, fileFilter, limits: { fileSize: 10 * 1024 * 1024 } });
exports.fileUploadMiddleware = upload.single("thumbnail");
