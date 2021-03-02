"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.retrieveOneCamera = exports.retrieveAllCamera = exports.registerCamera = void 0;
const camera_1 = require("../model/camera");
const error_1 = require("../utils/error");
/**
 * 신규 카메라 장치 등록을 위한 API Endpoint. (HTTP POST Reqeust)
 * @param req 클라이언트 Request
 * @param res 클라이언트 측에 전송할 Response
 */
function registerCamera(req, res) {
    const formData = req.body;
    const createdCamera = new camera_1.cameraModel(Object.assign({}, formData));
    createdCamera
        .save()
        .then(savedCamera => {
        res.json({
            result: 1,
            data: savedCamera,
        });
    })
        .catch(error => {
        // TODO: 보다 더 적절한 예외 처리
        res.json(Object.assign({ result: 0 }, error));
    });
}
exports.registerCamera = registerCamera;
/**
 * 전체 카메라 장치 목록 조회를 위한 API Endpoint. (HTTP GET Reqeust, No Query Params)
 * @param req 클라이언트 Request
 * @param res 클라이언트 측에 전송할 Response
 */
function retrieveAllCamera(req, res) {
    camera_1.cameraModel
        .find()
        .then(cameras => {
        res.json({
            result: 1,
            data: cameras,
        });
    })
        .catch(error => {
        // TODO: 보다 더 적절한 예외 처리
        res.json(Object.assign({ result: 0 }, error));
    });
}
exports.retrieveAllCamera = retrieveAllCamera;
/**
 * 단일 카메라 장치 목록 조회를 위한 API Endpoint. (HTTP GET Reqeust, Query Param Required)
 * @param req 클라이언트 Request
 * @param res 클라이언트 측에 전송할 Response
 * @param next 다음 Middleware로 Context를 위임하기 위한 Express 내장 함수
 */
function retrieveOneCamera(req, res, next) {
    const deviceCode = req.params.deviceCode;
    camera_1.cameraModel
        .findOne({ deviceCode: deviceCode })
        .then(camera => {
        // 입력된 일련 번호와 일치하는 카메라가 존재하지 않는 경우
        if (!camera) {
            const error = new error_1.CustomError(404, "Not Found");
            throw error;
        }
        res.json({
            result: 1,
            data: camera,
        });
    })
        .catch(error => {
        // TODO: 보다 더 적절한 예외 처리
        if (!("statusCode" in error && "message" in error)) {
            error = new error_1.CustomError(400, "Bad Request");
        }
        next(error);
    });
}
exports.retrieveOneCamera = retrieveOneCamera;
