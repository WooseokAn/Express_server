"use strict";
/**
 * 구역 ID: MongoDB 자동 생성 ID (Unique)
 * 구역 정보: 구역에 대한 간략한 정보 또는 전달사항
 * 등록 카메라 ID: [구역에 등록된 카메라의 MongoDB ID List]
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.sectionModel = exports.sectionSchema = void 0;
var mongoose_1 = require("mongoose");
// Mongoose Schema
exports.sectionSchema = new mongoose_1.Schema({
    description: {
        type: String,
        required: true,
    },
    totalArea: {
        type: Number,
        required: true,
    },
    invalidArea: {
        type: Number,
        required: true,
    },
    centerLatitude: {
        type: Number,
        required: true,
    },
    centerLongitude: {
        type: Number,
        required: true,
    },
    registeredCameras: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Camera",
        },
    ],
    createdAt: {
        type: String,
        default: Date.now,
    },
});
// Model
exports.sectionModel = mongoose_1.model("Section", exports.sectionSchema);
