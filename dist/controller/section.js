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
exports.retrieveCongestion = exports.retrieveOneSection = exports.retrieveAllSection = exports.createSection = void 0;
var section_1 = require("../model/section");
var error_1 = require("../utils/error");
/**
 * 신규 구역 등록을 위한 API Endpoint. (HTTP POST Reqeust)
 * @param req 클라이언트 Request
 * @param res 클라이언트 측에 전송할 Response
 */
function createSection(req, res) {
    var formData = req.body;
    var newSection = new section_1.sectionModel(__assign({}, formData));
    newSection
        .save()
        .then(function (savedSection) {
        res.json({
            result: 1,
            data: savedSection,
        });
    })
        .catch(function (error) {
        // TODO: 보다 더 적절한 예외 처리
        res.json(__assign({ result: 0 }, error));
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
        .then(function (sections) {
        res.json({
            result: 1,
            data: sections,
        });
    })
        .catch(function (error) {
        // TODO: 보다 더 적절한 예외 처리
        res.json(__assign({ result: 0 }, error));
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
    var sectionId = req.params.sectionId;
    section_1.sectionModel
        .findOne({ _id: sectionId })
        .then(function (section) {
        // 입력된 일련 번호와 일치하는 카메라가 존재하지 않는 경우
        if (!section) {
            var error = new error_1.CustomError(404, "Not Found");
            throw error;
        }
        res.json({
            result: 1,
            data: section,
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
exports.retrieveOneSection = retrieveOneSection;
/**
 * 등록된 단일 구역의 혼잡도 정보 조회를 위한 API Endpoint. (HTTP GET Reqeust, Query Param Required)
 * @param req 클라이언트 Request
 * @param res 클라이언트 측에 전송할 Response
 * @param next 다음 Middleware로 Context를 위임하기 위한 Express 내장 함수
 */
function retrieveCongestion(req, res, next) {
    var sectionId = req.params.sectionId;
    res.json({
        result: 1,
        data: sectionId,
    });
    // sectionModel
    //   .findOne({ _id: sectionId })
    //   .then(section => {
    //     // 입력된 일련 번호와 일치하는 카메라가 존재하지 않는 경우
    //     if (!section) {
    //       const error = new CustomError(404, "Not Found");
    //       throw error;
    //     }
    //     return section.registeredCameras;
    //   })
    //   .then(cameraIdArray => {
    //     console.log(cameraIdArray);
    //   })
    //   .catch(error => {
    //     // TODO: 보다 더 적절한 예외 처리
    //     if (!("statusCode" in error && "message" in error)) {
    //       error = new CustomError(400, "Bad Request");
    //     }
    //     next(error);
    //   });
}
exports.retrieveCongestion = retrieveCongestion;
