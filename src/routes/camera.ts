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
 *    comsumes:
 *      application/json
 *    parameters:
 *      - in: body
 *        name: user
 *        description: 신규 장치 등록을 위해 필요한 정보.
 *        schema:
 *          $ref: '#/components/schemas/Camera'
 *    responses:
 *      200:
 *        description: 요청한 카메라의 세부 정보
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Camera'
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
 *                $ref: '#/components/schemas/Camera'
 */
router.get("/", retrieveAllCamera);

/**
 * @swagger
 *  /api/camera/{deviceCode}:
 *    get:
 *      summary: 전체 카메라 장치의 목록을 조회한다.
 *      tags: [Cameras]
 *      description: 전체 카메라 장치의 목록을 조회한다.
 *      parameters:
 *        - name: deviceCode
 *          in: path
 *          description: "장치 일련번호 (ex. SALMON-0001)"
 *          required: true
 *          type: string
 *      responses:
 *        200:
 *          description: 등록된 카메라의 세부 정보
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Camera'
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
