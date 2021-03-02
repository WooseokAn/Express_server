"use strict";
/**
 * @swagger
 *  components:
 *    schemas:
 *      Record:
 *        type: object
 *        required:
 *          - personCount
 *          - tentCount
 *        properties:
 *          personCount:
 *            type: number
 *            description: RPI에서 전송되는 객체 수 검출 값 (사람)
 *          tentCount:
 *            type: number
 *            description: RPI에서 전송되는 객체 수 검출 값 (텐트)
 *          takenBy:
 *            type: Mongoose.Types.ObjectID
 *            description: MongoDB에서 자동 생성되는 BSON Type의 객체 ID 값.
 *          createdAt:
 *            type: Date
 *          expiresAt:
 *            type: Date
 *            description: Document가 소멸되기 까지의 기간 (현재 1일)
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.recordModel = exports.RecordSchema = void 0;
const mongoose_1 = require("mongoose");
// Mongoose Schema
exports.RecordSchema = new mongoose_1.Schema({
    personCount: {
        type: Number,
        required: true,
    },
    tentCount: {
        type: Number,
        required: true,
    },
    takenBy: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Camera",
    },
    createdAt: {
        type: String,
        default: Date.now, // [중요] new Date()가 아니라 Date.now를 사용해야 한다.
    },
    expiresAt: {
        type: Date,
        default: Date.now,
        expires: 86400,
    },
});
// Model
exports.recordModel = mongoose_1.model("Record", exports.RecordSchema);
