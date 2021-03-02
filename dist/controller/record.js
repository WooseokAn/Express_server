"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.retrieveLastestRecord = exports.retrieveAllRecord = exports.createRecord = void 0;
const camera_1 = require("../model/camera");
const record_1 = require("../model/record");
const error_1 = require("../utils/error");
/**
 * 특정 카메라 장치에서 검출한 사람/텐트 객체수 등록을 위한 API Endpoint. (HTTP POST Reqeust, Query Param Required)
 * @param req 클라이언트 Request
 * @param res 클라이언트 측에 전송할 Response
 * @param next 다음 Middleware로 Context를 위임하기 위한 Express 내장 함수
 */
function createRecord(req, res, next) {
    const deviceCode = req.params.deviceCode;
    const formData = req.body;
    camera_1.cameraModel
        .findOne({ deviceCode: deviceCode })
        .then(targetDevice => {
        if (!targetDevice) {
            const error = new error_1.CustomError(404, "Not Found");
            throw error;
        }
        // [중요] Document ID는 Schema.Types.ObjectId 타입이다.
        const createdRecord = new record_1.recordModel(Object.assign(Object.assign({}, formData), { takenBy: targetDevice._id }));
        return createdRecord.save();
    })
        .then(savedRecord => {
        res.json({
            result: 1,
            data: savedRecord,
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
exports.createRecord = createRecord;
/**
 * 특정 카메라 장치에서 검출하여 저장한 데이터의 목록 조회를 위한 API Endpoint. (HTTP GET Reqeust, Query Param Required)
 * @param req 클라이언트 Request
 * @param res 클라이언트 측에 전송할 Response
 * @param next 다음 Middleware로 Context를 위임하기 위한 Express 내장 함수
 */
function retrieveAllRecord(req, res, next) {
    const deviceCode = req.params.deviceCode;
    camera_1.cameraModel
        .findOne({ deviceCode: deviceCode })
        .then(targetDevice => {
        if (!targetDevice) {
            const error = new error_1.CustomError(404, "Not Found");
            throw error;
        }
        return targetDevice._id;
    })
        .then((deviceObjectId) => __awaiter(this, void 0, void 0, function* () {
        const records = yield record_1.recordModel.find({ takenBy: deviceObjectId });
        res.json({
            result: 1,
            data: records,
        });
    }))
        .catch(error => {
        // TODO: 보다 더 적절한 예외 처리
        if (!("statusCode" in error && "message" in error)) {
            error = new error_1.CustomError(400, "Bad Request");
        }
        next(error);
    });
}
exports.retrieveAllRecord = retrieveAllRecord;
/**
 * 특정 카메라 장치에서 검출하여 저장한 데이터 중 가장 최신 데이터의 조회를 위한 API Endpoint. (HTTP GET Reqeust, Query Param Required)
 * @param req 클라이언트 Request
 * @param res 클라이언트 측에 전송할 Response
 * @param next 다음 Middleware로 Context를 위임하기 위한 Express 내장 함수
 */
function retrieveLastestRecord(req, res, next) {
    const deviceCode = req.params.deviceCode;
    camera_1.cameraModel
        .findOne({ deviceCode: deviceCode })
        .then(targetDevice => {
        if (!targetDevice) {
            const error = new error_1.CustomError(404, "Not Found");
            throw error;
        }
        return targetDevice._id;
    })
        .then((deviceObjectId) => __awaiter(this, void 0, void 0, function* () {
        const latestRecord = yield record_1.recordModel.findOne({ takenBy: deviceObjectId }).sort({ createdAt: 1 });
        res.json({
            result: 1,
            data: latestRecord,
        });
    }))
        .catch(error => {
        // TODO: 보다 더 적절한 예외 처리
        if (!("statusCode" in error && "message" in error)) {
            error = new error_1.CustomError(400, "Bad Request");
        }
        next(error);
    });
}
exports.retrieveLastestRecord = retrieveLastestRecord;
