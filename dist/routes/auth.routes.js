"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
const auth_controllers_1 = require("../controllers/auth.controllers");
const authRouter = (0, express_1.Router)();
exports.authRouter = authRouter;
authRouter.post('/sign-in', auth_controllers_1.signIn);
authRouter.post('/sign-up', auth_controllers_1.signUp);
authRouter.post('/sign-out', auth_controllers_1.signOut);
authRouter.post('/refresh-token', auth_controllers_1.refreshToken);
