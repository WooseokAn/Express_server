/**
 * 카메라 일련번호: salmon-XXXX
 * 장소: 뚝섬 한강공원 여름 캠핑장
 * 좌표값: (127.32122, 32.32133)
 * 추가 설명: 편의점 근처에 설치된 카메라입니다.
 */

import { model, Schema, Model, Document } from "mongoose";

// Type Definition w/ interface
export interface Camera {
  deviceCode: string;
  location: string;
  longitude: number;
  latitude: number;
  description: string;
  createdAt?: Date;
}

// Mongoose Schema
export const CameraSchema: Schema = new Schema({
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
    default: new Date(),
  },
});

// Model
export const cameraModel: Model<Camera & Document> = model("Camera", CameraSchema);
