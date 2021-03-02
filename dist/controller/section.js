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
exports.retrieveCongestion = exports.retrieveOneSection = exports.retrieveAllSection = exports.createSection = void 0;
const section_1 = require("../model/section");
const record_1 = require("../model/record");
const error_1 = require("../utils/error");
const congestion_1 = require("../utils/congestion");
/**
 * 신규 구역 등록을 위한 API Endpoint. (HTTP POST Reqeust)
 * @param req 클라이언트 Request
 * @param res 클라이언트 측에 전송할 Response
 */
function createSection(req, res) {
    const formData = req.body;
    const newSection = new section_1.sectionModel(Object.assign({}, formData));
    newSection
        .save()
        .then(savedSection => {
        res.json({
            result: 1,
            data: savedSection,
        });
    })
        .catch(error => {
        // TODO: 보다 더 적절한 예외 처리
        res.json(Object.assign({ result: 0 }, error));
    });
}
exports.createSection = createSection;
/**
 * 등록된 전체 구역 목록 조회를 위한 API Endpoint. (HTTP GET Reqeust)
 * @param req 클라이언트 Request
 * @param res 클라이언트 측에 전송할 Response
 */
function retrieveAllSection(req, res) {
    section_1.sectionModel
        .find()
        .then(sections => {
        res.json({
            result: 1,
            data: sections,
        });
    })
        .catch(error => {
        // TODO: 보다 더 적절한 예외 처리
        res.json(Object.assign({ result: 0 }, error));
    });
}
exports.retrieveAllSection = retrieveAllSection;
/**
 * 등록된 단일 구역 정보 조회를 위한 API Endpoint. (HTTP GET Reqeust, Query Param Required)
 * @param req 클라이언트 Request
 * @param res 클라이언트 측에 전송할 Response
 * @param next 다음 Middleware로 Context를 위임하기 위한 Express 내장 함수
 */
function retrieveOneSection(req, res, next) {
    const sectionId = req.params.sectionId;
    section_1.sectionModel
        .findOne({ _id: sectionId })
        .then(section => {
        // 입력된 일련 번호와 일치하는 카메라가 존재하지 않는 경우
        if (!section) {
            const error = new error_1.CustomError(404, "Not Found");
            throw error;
        }
        res.json({
            result: 1,
            data: section,
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
exports.retrieveOneSection = retrieveOneSection;
/**
 * 등록된 단일 구역의 혼잡도 정보 조회를 위한 API Endpoint. (HTTP GET Reqeust, Query Param Required)
 * @param req 클라이언트 Request
 * @param res 클라이언트 측에 전송할 Response
 * @param next 다음 Middleware로 Context를 위임하기 위한 Express 내장 함수
 */
function retrieveCongestion(req, res, next) {
    const sectionId = req.params.sectionId;
    section_1.sectionModel
        .findOne({ _id: sectionId })
        .then(section => {
        if (!section) {
            const error = new error_1.CustomError(404, "Not Found");
            throw error;
        }
        return section;
    })
        .then((section) => __awaiter(this, void 0, void 0, function* () {
        const { registeredCameras, totalArea, invalidArea } = section;
        const numberOfCamera = (registeredCameras === null || registeredCameras === void 0 ? void 0 : registeredCameras.length) || 0;
        if (numberOfCamera === 0) {
            const error = new error_1.CustomError(404, "Not Found");
            throw error;
        }
        // map()을 이용해 Pending 상태의 Promise를 배열애 담고, Promise.all()을 통해 전부 '이행' 시킨다.
        const totalCounts = (yield Promise.all(registeredCameras.map(cameraObjectId => {
            const pendingPromise = record_1.recordModel.findOne({ takenBy: cameraObjectId }).sort({ createdAt: 1 });
            return pendingPromise;
        })))
            // 이어서 reduce()를 이용해 각 데이터의 계수 값을 누적한다.
            .reduce((accumulator, currentValue) => {
            if (currentValue && currentValue.personCount && currentValue.tentCount) {
                accumulator.tentCount += currentValue.tentCount;
                accumulator.personCount += currentValue.personCount;
            }
            return accumulator;
        }, { tentCount: 0, personCount: 0 });
        return Object.assign({ numberOfCamera, totalArea, invalidArea }, totalCounts);
    }))
        .then(({ numberOfCamera, totalArea, invalidArea, tentCount, personCount }) => {
        const congestionCalculator = new congestion_1.CongestionCalculator(totalArea, invalidArea, numberOfCamera);
        const congestion = congestionCalculator.calculateCongestion(tentCount, personCount);
        const congestionLevel = congestionCalculator.parseCongestion(congestion);
        res.json({
            result: 1,
            congestionLevel: congestionLevel,
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
exports.retrieveCongestion = retrieveCongestion;
