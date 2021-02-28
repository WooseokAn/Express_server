/**
 * 레코드 ID: J321K9453JE...
 * 카메라 일련번호: salmon-XXXX
 * 촬영 시간: XXXX-XX-XX XX:XX (ISO)
 * 검출된 사람 수: 29
 * 검출된 텐트 수: 17
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
