"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.videoRouter = void 0;
const express_1 = require("express");
const videoRouter = (0, express_1.Router)();
exports.videoRouter = videoRouter;
videoRouter.get("/videos", (req, res) => {
    console.log("Fetching all videos");
});
videoRouter.get("/videos/:id", (req, res) => {
    console.log(`Fetching video with ID: ${req.params.id}`);
});
