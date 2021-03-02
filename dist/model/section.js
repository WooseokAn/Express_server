"use strict";
/**
 * @swagger
 *  components:
 *    schemas:
 *      Section:
 *        type: object
 *        required:
 *          - name
 *          - totalArea
 *          - invalidArea
 *          - centerLongitude
 *          - centerLatitude
 *          - description
 *        properties:
 *          name:
 *            type: String
 *            description: 구역 명칭 (카메라 등록 및 구역 연동 시 사용)
 *          totalArea:
 *            type: Number
 *            format: Square Meter
 *            description: 해당 구역의 전체 면적
 *          invalidArea:
 *            type: Number
 *            format: Square Meter
 *            description: 해당 구역의 비가용 면적 총합
 *          centerLongitude:
 *            type: Number
 *            description: 구역 중심부 경도 (지도 API 사용 시 필요할 수 있으므로 포함)
 *          centerLatitude:
 *            type: Number
 *            description: 구역 중심부 위도 (지도 API 사용 시 필요할 수 있으므로 포함)
 *          description:
 *            type: String
 *            description: 구역에 대한 간략한 정보 또는 설명
 *          registeredCameras:
 *            type: Array<Mongoose.Types.ObjectID>
 *            description: 구역에 등록된 카메라 Document에 대한 참조 배열
 *          createdAt:
 *            type: Date
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.sectionModel = exports.sectionSchema = void 0;
/**
 * 구역 ID: MongoDB 자동 생성 ID (Unique)
 * 구역 정보: 구역에 대한 간략한 정보 또는 전달사항
 * 등록 카메라 ID: [구역에 등록된 카메라의 MongoDB ID List]
 */
const mongoose_1 = require("mongoose");
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
