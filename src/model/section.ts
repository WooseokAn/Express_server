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
 *            type: string
 *            description: 구역 명칭 (카메라 등록 및 구역 연동 시 사용)
 *          totalArea:
 *            type: number
 *            format: Square Meter
 *            description: 해당 구역의 전체 면적
 *          invalidArea:
 *            type: number
 *            format: Square Meter
 *            description: 해당 구역의 비가용 면적 총합
 *          centerLongitude:
 *            type: number
 *            description: 구역 중심부 경도 (지도 API 사용 시 필요할 수 있으므로 포함)
 *          centerLatitude:
 *            type: number
 *            description: 구역 중심부 위도 (지도 API 사용 시 필요할 수 있으므로 포함)
 *          description:
 *            type: string
 *            description: 구역에 대한 간략한 정보 또는 설명
 *          registeredCameras:
 *            type: array
 *            description: 구역에 등록된 카메라 Document에 대한 참조 배열
 *          createdAt:
 *            type: Date
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
