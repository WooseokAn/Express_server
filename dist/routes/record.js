"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const record_1 = require("../controller/record");
/**
 * @swagger
 *  tags:
 *    name: Records
 *    description: AI 카메라에서 검출된 결과를 관리하기 위한 API 엔드포인트 집합.
 */
const router = express_1.Router();
/**
 * @swagger
 *  /api/record/{deviceCode}:
 *  post:
 *    summary: 단일 AI 카메라에서 검출된 결과(= 레코드)를 등록한다.
 *    tags: [Records]
 *    comsumes:
 *      application/json
 *    parameters:
 *      - in: path
 *        name: deviceCode
 *        description: "장치 일련번호"
 *        required: true
 *        type: string
 *        example: SALMON-0001
 *    requestBody:
 *      description: "라즈베리파이에서 전송한 사람/텐트 객체 계수 결과값"
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Record'
 *          example:
 *            personCount: 1
 *            tenstCount: 2
 *    responses:
 *      200:
 *        description: 새롭게 등록된 레코드의 세부정보
 *        content:
 *          application/json:
 *            schema:
 *              result:
 *                type: number
 *              data:
 *                $ref: '#/components/schemas/Record'
 *            example:
 *              result: 1
 *              data: {
 *                _id: 603dfc5d326723297d6dc9ee,
 *                personCount: 19,
 *                tentCount: 17,
 *                takenBy: 603b5445d93fd37d34a6a516,
 *                createdAt: 1614675037936,
 *                expiresAt: 2021-03-02T08:50:37.936Z,
 *              }
 */
router.post("/:deviceCode", record_1.createRecord);
/**
 * @swagger
 *  /api/record/{deviceCode}:
 *    get:
 *      summary: 단일 AI 카메라 장치에서 가장 최근데 등록된 레코드를 조회한다.
 *      tags: [Records]
 *      description: 단일 AI 카메라 장치에서 촬영되어 등록된 레코드 목록 중 가장 최근의 것 조회한다.
 *      parameters:
 *        - in: path
 *          name: deviceCode
 *          description: "장치 일련번호"
 *          required: true
 *          type: string
 *          example: SALMON-0001
 *      responses:
 *        200:
 *          description: 등록된 카메라의 세부 정보
 *          content:
 *            application/json:
 *              schema:
 *                result:
 *                  type: number
 *                data:
 *                  $ref: '#/components/schemas/Record'
 *              example:
 *                result: 1
 *                data: {
 *                  _id: 603dfc5d326723297d6dc9ee,
 *                  personCount: 19,
 *                  tentCount: 17,
 *                  takenBy: 603b5445d93fd37d34a6a516,
 *                  createdAt: 1614675037936,
 *                  expiresAt: 2021-03-02T08:50:37.936Z,
 *                }
 */
router.get("/:deviceCode", record_1.retrieveLastestRecord);
/**
 * @swagger
 *  /api/record/{deviceCode}/list:
 *    get:
 *      summary: 단일 AI 카메라 장치에서 등록된 모든 레코드를 조회한다.
 *      tags: [Records]
 *      description: 단일 AI 카메라 장치에서 촬영되어 등록된 레코드 목록 전체를 조회한다 (단, 24시간 후 자동 소멸).
 *      parameters:
 *        - in: path
 *          name: deviceCode
 *          description: "장치 일련번호"
 *          required: true
 *          type: string
 *          example: SALMON-0001
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
 *                    _id: 603dfc5d326723297d6dc9ee,
 *                    personCount: 19,
 *                    tentCount: 17,
 *                    takenBy: 603b5445d93fd37d34a6a516,
 *                    createdAt: 1614675037936,
 *                    expiresAt: 2021-03-02T08:50:37.936Z,
 *                  },
 *                  {
 *                    _id: 603dff806e24e22c6a5095a0,
 *                    personCount: 29,
 *                    tentCount: 19,
 *                    takenBy: 603b5445d93fd37d34a6a516,
 *                    createdAt: 1614675840394,
 *                    expiresAt: 2021-03-02T09:04:00.394Z,
 *                  }
 *                ]
 */
router.get("/:deviceCode/list", record_1.retrieveAllRecord);
exports.default = router;
