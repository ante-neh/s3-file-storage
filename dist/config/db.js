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
exports.connectToDatabase = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const env_1 = require("./env");
const connectToDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!env_1.MONGO_CONN) {
            throw new Error('Database URL is not defined');
        }
        yield mongoose_1.default.connect(env_1.MONGO_CONN);
        console.log('Connected to the database successfully');
    }
    catch (error) {
        console.error('Error connecting to the database:', error);
        process.exit(1);
    }
});
exports.connectToDatabase = connectToDatabase;
