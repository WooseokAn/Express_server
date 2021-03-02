"use strict";
/**
 * @swagger
 *  components:
 *    schemas:
 *      Camera:
 *        type: object
 *        required:
 *          - deviceCode
 *          - location
 *          - longitude
 *          - latitude
 *          - description
 *        properties:
 *          deviceCode:
 *            type: string
 *            format: SALMON-XXXX
 *            description: 카메라 일련번호
 *          location:
 *            type: string
 *            description: 카메라가 설치된 위치 또는 구역 이름
 *          longitude:
 *            type: number
 *            description: 경도 (지도 API 사용 시 필요할 수 있으므로 포함)
 *          latitude:
 *            type: number
 *            description: 위도 (지도 API 사용 시 필요할 수 있으므로 포함)
 *          description:
 *            type: string
 *            description: 카메라를 기억하기 쉽도록 도울 수 있는 간략한 설명 등
 *          createdAt:
 *            type: Date
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.cameraModel = exports.CameraSchema = void 0;
const mongoose_1 = require("mongoose");
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
