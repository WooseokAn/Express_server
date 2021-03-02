import { Router } from "express";
import { registerCamera, retrieveAllCamera, retrieveOneCamera } from "../controller/camera";

/**
 * @swagger
 *  tags:
 *    name: Cameras
 *    description: AI 카메라와 관련된 API 엔드포인트 집합.
 */
const router = Router();

/**
 * @swagger
 *  /api/camera:
 *  post:
 *    summary: 신규 카메라 장치를 등록한다.
 *    tags: [Cameras]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Camera'
 *          example:
 *            deviceCode: SALMON-0000
 *            location: 뚝섬 한강공원 여름캠핑장 1번 구역
 *            longitude:  127.32132
 *            latitude: 35.32131
 *            description: CU 편의점 인근에 설치한 카메라입니다.
 *    responses:
 *      200:
 *        description: 요청한 카메라의 세부 정보
 *        content:
 *          application/json:
 *            schema:
 *              result:
 *                type: number
 *              data:
 *                $ref: '#/components/schemas/Camera'
 *            example:
 *              result: 1
 *              data:
 *                {
 *                  _id: 603b5445d93fd37d34a6a516,
 *                  deviceCode: SALMON-0001,
 *                  location: 뚝섬 한강공원 여름캠핑장 1번 구역,
 *                  longitude:  127.32132,
 *                  latitude: 35.32131,
 *                  description: CU 편의점 인근에 설치한 카메라입니다.,
 *                  createdAt: 1614672979913,
 *                }
 */
router.post("/", registerCamera);

/**
 * @swagger
 *  /api/camera:
 *    get:
 *      summary: 전체 카메라 장치의 목록을 조회한다.
 *      tags: [Cameras]
 *      description: 전체 카메라 장치의 목록을 조회한다.
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
 *                    _id: 603b5445d93fd37d34a6a516,
 *                    deviceCode: SALMON-0000,
 *                    location: 뚝섬 한강공원 여름캠핑장 1번 구역,
 *                    longitude:  127.32132,
 *                    latitude: 35.32131,
 *                    description: CU 편의점 인근에 설치한 카메라입니다.,
 *                    createdAt: 1614672979913,
 *                  },
 *                ]
 */
router.get("/", retrieveAllCamera);

/**
 * @swagger
 *  /api/camera/{deviceCode}:
 *    get:
 *      summary: 단일 카메라 장치의 세부정보를 조회한다.
 *      tags: [Cameras]
 *      description: 단일 카메라 장치의 세부정보를 조회한다.
 *      parameters:
 *        - name: deviceCode
 *          in: path
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
 *                  $ref: '#/components/schemas/Camera'
 *              example:
 *                result: 1
 *                data:
 *                  {
 *                    _id: 603b5445d93fd37d34a6a516,
 *                    deviceCode: SALMON-0001,
 *                    location: 뚝섬 한강공원 여름캠핑장 1번 구역,
 *                    longitude:  127.32132,
 *                    latitude: 35.32131,
 *                    description: CU 편의점 인근에 설치한 카메라입니다.,
 *                    createdAt: 1614672979913,
 *                  }
 */
router.get("/:deviceCode", retrieveOneCamera);

/**
 * @swagger
 * /api/camera/{일련번호}:
 *   put:
 *     description: [미구현] 단일 카메라 장치 정보를 수정한다.
 *     responses:
 *       200:
 *         description: This does not work!
 */
router.put("/:deviceCode", (req, res) => {
  res.json({
    message: "아직 구현되지 않은 API Endpoint 입니다.",
  });
});

/**
 * @swagger
 * /api/camera/{일련번호}:
 *   delete:
 *     description: [미구현] 단일 카메라 장치 정보를 삭제한다.
 *     responses:
 *       200:
 *         description: This does not work!
 */
router.delete("/:deviceCode", (req, res) => {
  res.json({
    message: "아직 구현되지 않은 API Endpoint 입니다.",
  });
});

export default router;
