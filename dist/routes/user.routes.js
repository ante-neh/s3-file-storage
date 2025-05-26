"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const userRouter = (0, express_1.Router)();
exports.userRouter = userRouter;
userRouter.get("/:id", auth_middleware_1.authMiddleware, user_controller_1.getUser);
