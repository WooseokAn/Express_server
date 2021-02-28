"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.retrieveOneCamera = exports.retrieveAllCamera = exports.registerCamera = void 0;
var camera_1 = require("../model/camera");
var error_1 = require("../utils/error");
/**
 * 신규 카메라 장치 등록을 위한 API Endpoint. (HTTP POST Reqeust)
 * @param req 클라이언트 Request
 * @param res 클라이언트 측에 전송할 Response
 */
function registerCamera(req, res) {
    var formData = req.body;
    var createdCamera = new camera_1.cameraModel(__assign({}, formData));
    createdCamera
        .save()
        .then(function (savedCamera) {
        res.json({
            result: 1,
            data: savedCamera,
        });
    })
        .catch(function (error) {
        // TODO: 보다 더 적절한 예외 처리
        res.json(__assign({ result: 0 }, error));
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
        .then(function (cameras) {
        res.json({
            result: 1,
            data: cameras,
        });
    })
        .catch(function (error) {
        // TODO: 보다 더 적절한 예외 처리
        res.json(__assign({ result: 0 }, error));
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
    var deviceCode = req.params.deviceCode;
    camera_1.cameraModel
        .findOne({ deviceCode: deviceCode })
        .then(function (camera) {
        // 입력된 일련 번호와 일치하는 카메라가 존재하지 않는 경우
        if (!camera) {
            var error = new error_1.CustomError(404, "Not Found");
            throw error;
        }
        res.json({
            result: 1,
            data: camera,
        });
    })
        .catch(function (error) {
        // TODO: 보다 더 적절한 예외 처리
        if (!("statusCode" in error && "message" in error)) {
            error = new error_1.CustomError(400, "Bad Request");
        }
        next(error);
    });
}
exports.retrieveOneCamera = retrieveOneCamera;
