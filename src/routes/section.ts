import { Router } from "express";
import { createSection, retrieveAllSection, retrieveOneSection, retrieveCongestion } from "../controller/section";

/**
 * @swagger
 *  tags:
 *    name: Sections
 *    description: 한강공원 각 구역에 대한 데이터를 등록하고 관리하기 위한 API 엔드포인트 집합.
 */
const router = Router();

/**
 * @swagger
 *  /api/section:
 *    post:
 *      summary: 새로운 구역을 등록한다.
 *      tags: [Sections]
 *      requestBody:
 *        description: "새롭게 등록하려는 한강공원 구역의 세부 정보"
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Section'
 *            example:
 *              name: 뚝섬 한강공원 여름 캠핑장 1구역
 *              totalArea: 4629
 *              invalidArea: 900
 *              centerLongitude: 127.3218
 *              centerLatitude: 35.32112
 *              description: 뚝섬 한강공원 여름 캠핑장 1구역 (지도 상 좌측 영역)
 *      responses:
 *        200:
 *          description: 새롭게 등록된 구역의 세부정보
 *          content:
 *            application/json:
 *              schema:
 *                result:
 *                  type: number
 *                data:
 *                  $ref: '#/components/schemas/Section'
 *              example:
 *                result: 1
 *                data: {
 *                  _id: "603ba25bb7683e084fe9af7f",
 *                  name: 뚝섬 한강공원 여름 캠핑장 1구역,
 *                  totalArea: 4629,
 *                  invalidArea: 900,
 *                  centerLongitude: 127.3218,
 *                  centerLatitude: 35.32112,
 *                  description: 뚝섬 한강공원 여름 캠핑장 1구역 (지도 상 좌측 영역),
 *                  registeredCameras: [],
 *                  createdAt: 1614520923489,
 *                }
 */
router.post("/", createSection);

/**
 * @swagger
 *  /api/section:
 *    get:
 *      summary: 등록된 전체 한강 구역에 대한 세부사항 목록을 조회한다.
 *      tags: [Sections]
 *      description: 등록된 전체 한강 구역에 대한 세부사항 목록을 조회한다.
 *      responses:
 *        200:
 *          description: 등록된 카메라의 세부 정보
 *          content:
 *            application/json:
 *              schema:
 *                result:
 *                  type: number
 *                data:
 *                  type: array
 *              example:
 *                result: 1
 *                data: [
 *                  {
 *                    _id: "603ba25bb7683e084fe9af7f",
 *                    name: 뚝섬 한강공원 여름 캠핑장 1구역,
 *                    totalArea: 4629,
 *                    invalidArea: 900,
 *                    centerLongitude: 127.3218,
 *                    centerLatitude: 35.32112,
 *                    description: 뚝섬 한강공원 여름 캠핑장 1구역 (지도 상 좌측 영역),
 *                    registeredCameras: [
 *                        603b5445d93fd37d34a6a516,
 *                        603b532906c9677caae5963a
 *                    ],
 *                    createdAt: 1614520923489,
 *                  }
 *                ]
 */
router.get("/", retrieveAllSection);

/**
 * @swagger
 *  /api/section/{sectionId}:
 *    get:
 *      summary: 단일 한강공원 구역에 대한 세부 정보를 조회한다.
 *      tags: [Sections]
 *      description: 단일 한강공원 구역에 대한 세부 정보를 조회한다.
 *      parameters:
 *        - in: path
 *          name: sectionId
 *          description: "조회하려는 구역의 MongoDB Document ID 값"
 *          required: true
 *          type: string
 *          example: 603ba25bb7683e084fe9af7f
 *      responses:
 *        200:
 *          description: 조회된 단일 한강공원 구역의 세부정보
 *          content:
 *            application/json:
 *              schema:
 *                result:
 *                  type: number
 *                data:
 *                  $ref: '#/components/schemas/Section'
 *              example:
 *                result: 1
 *                data: {
 *                  _id: "603ba25bb7683e084fe9af7f",
 *                  name: 뚝섬 한강공원 여름 캠핑장 1구역,
 *                  totalArea: 4629,
 *                  invalidArea: 900,
 *                  centerLongitude: 127.3218,
 *                  centerLatitude: 35.32112,
 *                  description: 여름 캠핑장 1구역 (지도 상 좌측 영역),
 *                  registeredCameras: [
 *                      603b5445d93fd37d34a6a516,
 *                      603b532906c9677caae5963a
 *                  ],
 *                  createdAt: 1614520923489",
 *                }
 */
router.get("/:sectionId", retrieveOneSection);

/**
 * @swagger
 *  /api/section/{sectionId}/congestion:
 *    get:
 *      summary: 단일 구역의 최신 혼잡도 정보를 조회한다.
 *      tags: [Sections]
 *      description: 구역에 등록된 카메라에서 조회된 모든 객체 검출 결과를 정해진 수식에 대입하여 혼잡도를 도출한다.
 *      parameters:
 *        - in: path
 *          name: sectionId
 *          description: "조회하려는 구역의 MongoDB Document ID 값"
 *          required: true
 *          type: string
 *          example: 603ba25bb7683e084fe9af7f
 *      responses:
 *        200:
 *          description: 단일 구역의 최신 혼잡도 정보
 *          content:
 *            application/json:
 *              schema:
 *                result:
 *                  type: number
 *                congestion:
 *                  type: number
 *              example:
 *                result: 1
 *                congestion: 1
 */
router.get("/:sectionId/congestion", retrieveCongestion);

export default router;
