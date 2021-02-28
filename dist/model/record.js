"use strict";
/**
 * 레코드 ID: J321K9453JE...
 * 카메라 일련번호: salmon-XXXX
 * 촬영 시간: XXXX-XX-XX XX:XX (ISO)
 * 검출된 사람 수: 29
 * 검출된 텐트 수: 17
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.recordModel = exports.RecordSchema = void 0;
var mongoose_1 = require("mongoose");
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
        default: new Date(),
    },
    expiresAt: {
        type: Date,
        default: Date.now,
        expires: 86400,
    },
});
// Model
exports.recordModel = mongoose_1.model("Record", exports.RecordSchema);
