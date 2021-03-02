/**
 * @swagger
 *  components:
 *    schemas:
 *      Record:
 *        type: Object
 *        required:
 *          - personCount
 *          - tentCount
 *        properties:
 *          personCount:
 *            type: Number
 *            description: RPI에서 전송되는 객체 수 검출 값 (사람)
 *          tentCount:
 *            type: Number
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
