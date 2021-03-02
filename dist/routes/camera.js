"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const camera_1 = require("../controller/camera");
const router = express_1.Router();
router.post("/", camera_1.registerCamera);
router.get("/", camera_1.retrieveAllCamera);
router.get("/:deviceCode", camera_1.retrieveOneCamera);
router.put("/:deviceCode", (req, res) => {
    res.json({
        message: "아직 구현되지 않은 API Endpoint 입니다.",
    });
});
router.delete("/:deviceCode", (req, res) => {
    res.json({
        message: "아직 구현되지 않은 API Endpoint 입니다.",
    });
});
exports.default = router;
