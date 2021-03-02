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
 *            type: string
 *            description: 본 레코드를 등록한 카메라를 참조하기 위한 BSON Type의 ID
 *          createdAt:
 *            type: Date
 *          expiresAt:
 *            type: Date
 *            description: Document가 소멸되기 까지의 기간 (현재 1일)
 */

import { model, Schema, Model, Document } from "mongoose";

// Type Definition w/ interface
export interface Record {
  personCount: number;
  tentCount: number;
  takenBy?: Schema.Types.ObjectId;
  createdAt?: Date;
  expiresAt?: Date;
}

// Mongoose Schema
export const RecordSchema: Schema = new Schema({
  personCount: {
    type: Number,
    required: true,
  },
  tentCount: {
    type: Number,
    required: true,
  },
  takenBy: {
    type: Schema.Types.ObjectId,
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
export const recordModel: Model<Record & Document> = model("Record", RecordSchema);
