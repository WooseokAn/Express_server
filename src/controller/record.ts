import { NextFunction, Request, Response } from "express";
import { Schema } from "mongoose";
import { cameraModel } from "../model/camera";
import { recordModel, Record } from "../model/record";
import { CustomError } from "../utils/error";

/**
 * 특정 카메라 장치에서 검출한 사람/텐트 객체수 등록을 위한 API Endpoint. (HTTP POST Reqeust, Query Param Required)
 * @param req 클라이언트 Request
 * @param res 클라이언트 측에 전송할 Response
 * @param next 다음 Middleware로 Context를 위임하기 위한 Express 내장 함수
 */
export function createRecord(req: Request, res: Response, next: NextFunction): void {
  const deviceCode = (req.params as { deviceCode: string }).deviceCode;
  const formData: Record = req.body as {
    personCount: number;
    tentCount: number;
  };

  cameraModel
    .findOne({ deviceCode: deviceCode })
    .then(targetDevice => {
      if (!targetDevice) {
        const error = new CustomError(404, "Not Found");
        throw error;
      }

      // [중요] Document ID는 Schema.Types.ObjectId 타입이다.
      const createdRecord = new recordModel({
        ...formData,
        takenBy: targetDevice._id as Schema.Types.ObjectId,
      });

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
        error = new CustomError(400, "Bad Request");
      }

      next(error);
    });
}

/**
 * 특정 카메라 장치에서 검출하여 저장한 데이터의 목록 조회를 위한 API Endpoint. (HTTP GET Reqeust, Query Param Required)
 * @param req 클라이언트 Request
 * @param res 클라이언트 측에 전송할 Response
 * @param next 다음 Middleware로 Context를 위임하기 위한 Express 내장 함수
 */
export function retrieveAllRecord(req: Request, res: Response, next: NextFunction): void {
  const deviceCode = (req.params as { deviceCode: string }).deviceCode;

  cameraModel
    .findOne({ deviceCode: deviceCode })
    .then(targetDevice => {
      if (!targetDevice) {
        const error = new CustomError(404, "Not Found");
        throw error;
      }

      return targetDevice._id as Schema.Types.ObjectId;
    })
    .then(async deviceObjectId => {
      const records = await recordModel.find({ takenBy: deviceObjectId });

      res.json({
        result: 1,
        data: records,
      });
    })
    .catch(error => {
      // TODO: 보다 더 적절한 예외 처리
      if (!("statusCode" in error && "message" in error)) {
        error = new CustomError(400, "Bad Request");
      }

      next(error);
    });
}

/**
 * 특정 카메라 장치에서 검출하여 저장한 데이터 중 가장 최신 데이터의 조회를 위한 API Endpoint. (HTTP GET Reqeust, Query Param Required)
 * @param req 클라이언트 Request
 * @param res 클라이언트 측에 전송할 Response
 * @param next 다음 Middleware로 Context를 위임하기 위한 Express 내장 함수
 */
export function retrieveLastestRecord(req: Request, res: Response, next: NextFunction): void {
  const deviceCode = (req.params as { deviceCode: string }).deviceCode;

  cameraModel
    .findOne({ deviceCode: deviceCode })
    .then(targetDevice => {
      if (!targetDevice) {
        const error = new CustomError(404, "Not Found");
        throw error;
      }

      return targetDevice._id as Schema.Types.ObjectId;
    })
    .then(async deviceObjectId => {
      const latestRecord = await recordModel.findOne({ takenBy: deviceObjectId }).sort({ createdAt: 1 });

      res.json({
        result: 1,
        data: latestRecord,
      });
    })
    .catch(error => {
      // TODO: 보다 더 적절한 예외 처리
      if (!("statusCode" in error && "message" in error)) {
        error = new CustomError(400, "Bad Request");
      }

      next(error);
    });
}
