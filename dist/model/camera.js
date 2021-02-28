"use strict";
/**
 * 카메라 일련번호: salmon-XXXX
 * 장소: 뚝섬 한강공원 여름 캠핑장
 * 좌표값: (127.32122, 32.32133)
 * 추가 설명: 편의점 근처에 설치된 카메라입니다.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.cameraModel = exports.CameraSchema = void 0;
var mongoose_1 = require("mongoose");
// Mongoose Schema
exports.CameraSchema = new mongoose_1.Schema({
    deviceCode: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    longitude: {
        type: Number,
        required: true,
    },
    latitude: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    createdAt: {
        type: String,
        default: Date.now,
    },
});
// Model
exports.cameraModel = mongoose_1.model("Camera", exports.CameraSchema);
