"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var camera_1 = require("../controller/camera");
var router = express_1.Router();
router.post("/", camera_1.registerCamera);
router.get("/", camera_1.retrieveAllCamera);
router.get("/:deviceCode", camera_1.retrieveOneCamera);
router.put("/:deviceCode", function (req, res) {
    res.json({
        message: "아직 구현되지 않은 API Endpoint 입니다.",
    });
});
router.delete("/:deviceCode", function (req, res) {
    res.json({
        message: "아직 구현되지 않은 API Endpoint 입니다.",
    });
});
exports.default = router;
