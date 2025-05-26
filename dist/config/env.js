"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWT_REFRESH_EXPIRATION = exports.JWT_REFRESH_SECRET = exports.NODE_ENV = exports.JWT_EXPIRATION = exports.JWT_SECRET = exports.PORT = exports.MONGO_CONN = void 0;
const dotenv_1 = require("dotenv");
const path_1 = __importDefault(require("path"));
(0, dotenv_1.config)({ path: path_1.default.resolve(process.cwd(), `.env.${process.env.NODE_ENV || 'development'}.local`) });
_a = process.env, exports.MONGO_CONN = _a.MONGO_CONN, exports.PORT = _a.PORT, exports.JWT_SECRET = _a.JWT_SECRET, exports.JWT_EXPIRATION = _a.JWT_EXPIRATION, exports.NODE_ENV = _a.NODE_ENV, exports.JWT_REFRESH_SECRET = _a.JWT_REFRESH_SECRET, exports.JWT_REFRESH_EXPIRATION = _a.JWT_REFRESH_EXPIRATION;
