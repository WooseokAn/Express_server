/**
 * 구역 ID: MongoDB 자동 생성 ID (Unique)
 * 구역 정보: 구역에 대한 간략한 정보 또는 전달사항
 * 등록 카메라 ID: [구역에 등록된 카메라의 MongoDB ID List]
 */

import { model, Schema, Model, Document } from "mongoose";

// Type Definition w/ interface
export interface Section {
  description: string;
  totalArea: number;
  invalidArea: number;
  centerLatitude: number;
  centerLongitude: number;
  registeredCameras?: Array<Schema.Types.ObjectId>;
  createdAt?: Date;
}

// Mongoose Schema
export const sectionSchema: Schema = new Schema({
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
      type: Schema.Types.ObjectId,
      ref: "Camera",
    },
  ],
  createdAt: {
    type: String,
    default: Date.now,
  },
});

// Model
export const sectionModel: Model<Section & Document> = model("Section", sectionSchema);
