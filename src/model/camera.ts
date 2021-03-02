/**
 * @swagger
 *  components:
 *    schemas:
 *      Camera:
 *        type: Object
 *        required:
 *          - deviceCode
 *          - location
 *          - longitude
 *          - latitude
 *          - description
 *        properties:
 *          deviceCode:
 *            type: String
 *            format: SALMON-XXXX
 *            description: 카메라 일련번호
 *          location:
 *            type: String
 *            description: 카메라가 설치된 위치 또는 구역 이름
 *          longitude:
 *            type: Number
 *            description: 경도 (지도 API 사용 시 필요할 수 있으므로 포함)
 *          latitude:
 *            type: Number
 *            description: 위도 (지도 API 사용 시 필요할 수 있으므로 포함)
 *          description:
 *            type: String
 *            description: 카메라를 기억하기 쉽도록 도울 수 있는 간략한 설명 등
 *          createdAt:
 *            type: Date
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
    default: Date.now,
  },
});

// Model
export const cameraModel: Model<Camera & Document> = model("Camera", CameraSchema);
