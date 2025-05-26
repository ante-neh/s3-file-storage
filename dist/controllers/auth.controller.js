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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshToken = exports.signOut = exports.signUp = exports.signIn = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const async_middleware_1 = require("../middlewares/async.middleware");
const types_1 = require("../types");
const user_models_1 = require("../models/user.models");
const jwthandler_1 = require("../utils/jwthandler");
const env_1 = require("../config/env");
const refresh_models_1 = require("../models/refresh.models");
const signIn = (0, async_middleware_1.asyncAwaitHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new types_1.BadRequestError("Email and password are required");
    }
    const existingUser = yield user_models_1.User.findOne({ email });
    if (!existingUser) {
        throw new types_1.NotFoundError("User not found");
    }
    const isPasswordValid = yield bcryptjs_1.default.compare(password, (existingUser === null || existingUser === void 0 ? void 0 : existingUser.password) || '');
    if (!isPasswordValid) {
        throw new types_1.InvalidInputError("Invalid password");
    }
    const token = (0, jwthandler_1.generateAccessToken)((existingUser === null || existingUser === void 0 ? void 0 : existingUser._id.toString()) || '');
    const refreshToken = (0, jwthandler_1.generateRefreshToken)(existingUser === null || existingUser === void 0 ? void 0 : existingUser._id.toString());
    yield refresh_models_1.RefreshToken.create({
        user: existingUser === null || existingUser === void 0 ? void 0 : existingUser._id.toString(),
        token: refreshToken,
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    });
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: env_1.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 30 * 24 * 60 * 60 * 1000
    });
    const _a = existingUser.toObject(), { password: _ } = _a, user = __rest(_a, ["password"]);
    return res.status(200).json({
        success: true,
        message: "User signed in successfully",
        data: {
            user,
            token
        }
    });
}));
exports.signIn = signIn;
const signUp = (0, async_middleware_1.asyncAwaitHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield user_models_1.User.startSession();
    session.startTransaction();
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            throw new types_1.InvalidInputError("Please provide all required fields");
        }
        const existingUser = yield user_models_1.User.findOne({ email });
        if (existingUser) {
            throw new Error("User already exists");
        }
        const user = yield user_models_1.User.create([{ name, email, password }], { session });
        const token = (0, jwthandler_1.generateAccessToken)(user[0]._id.toString());
        const refreshToken = (0, jwthandler_1.generateRefreshToken)(user[0]._id.toString());
        yield refresh_models_1.RefreshToken.create([{
                user: user[0]._id.toString(),
                token: refreshToken,
                expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
            }], { session });
        yield session.commitTransaction();
        session.endSession();
        const _a = user[0].toObject(), { password: _ } = _a, userWithoutPassword = __rest(_a, ["password"]);
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: env_1.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 30 * 24 * 60 * 60 * 1000
        });
        return res.status(201).json({
            success: true,
            message: "User signed up successfully",
            data: {
                user: userWithoutPassword,
                token
            }
        });
    }
    catch (_b) {
        yield session.abortTransaction();
        session.endSession();
        throw new Error("An error occurred during sign up");
    }
}));
exports.signUp = signUp;
const signOut = (0, async_middleware_1.asyncAwaitHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
        throw new types_1.BadRequestError("Refresh token is required");
    }
    yield refresh_models_1.RefreshToken.findOneAndDelete({
        token: refreshToken
    });
    res.clearCookie("refreshToken");
    res.status(200).json({
        success: true,
        message: "User signed out successfully"
    });
}));
exports.signOut = signOut;
const refreshToken = (0, async_middleware_1.asyncAwaitHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
        throw new types_1.BadRequestError("Refresh token is required");
    }
    const id = (0, jwthandler_1.verifyRefreshToken)(refreshToken);
    if (!id) {
        throw new types_1.InvalidInputError("Invalid refresh token");
    }
    const storedToken = yield refresh_models_1.RefreshToken.findOne({ user: id, token: refreshToken });
    if (!storedToken || storedToken.revoked) {
        yield refresh_models_1.RefreshToken.updateMany({ user: id }, { revoked: true });
        throw new types_1.InvalidInputError("Refresh token compromised. Please sign in again.");
    }
    const user = yield user_models_1.User.findById(id).select("-password");
    if (!user) {
        throw new types_1.NotFoundError("User not found");
    }
    storedToken.revoked = true;
    yield storedToken.save();
    const token = (0, jwthandler_1.generateAccessToken)(user._id.toString());
    const newRefreshToken = (0, jwthandler_1.generateRefreshToken)(user._id.toString());
    yield refresh_models_1.RefreshToken.create({
        user: id,
        token: newRefreshToken,
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    });
    res.cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        secure: env_1.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 30 * 24 * 60 * 60 * 1000
    });
    return res.status(200).json({
        success: true,
        message: "Token refreshed successfully",
        data: {
            user,
            token
        }
    });
}));
exports.refreshToken = refreshToken;
