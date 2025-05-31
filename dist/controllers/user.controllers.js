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
exports.getUser = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const async_middleware_1 = require("../middlewares/async.middleware");
const types_1 = require("../types");
const user_models_1 = require("../models/user.models");
const getUser = (0, async_middleware_1.asyncAwaitHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { id: userId } = req.params;
    if (!userId || !mongoose_1.default.Types.ObjectId.isValid(userId)) {
        throw new types_1.BadRequestError("Valid user ID is required");
    }
    if (!req.user) {
        throw new types_1.NotFoundError("User not authenticated");
    }
    if (((_a = req.user) === null || _a === void 0 ? void 0 : _a.id) !== userId) {
        throw new types_1.UserForbiddenError("Access denied, you can only access your own profile");
    }
    const user = yield user_models_1.User.findById(userId).select("-password -__v");
    if (!user) {
        throw new types_1.NotFoundError("User not found");
    }
    return res.status(200).json({
        success: true,
        data: {
            user
        }
    });
}));
exports.getUser = getUser;
