import { NextFunction, Request, Response } from "express";
import { cameraModel, Camera } from "../model/camera";
import { CustomError } from "../utils/error";

/**
 * 신규 카메라 장치 등록을 위한 API Endpoint. (HTTP POST Reqeust)
 * @param req 클라이언트 Request
 * @param res 클라이언트 측에 전송할 Response
 */
export function registerCamera(req: Request, res: Response): void {
  const formData: Camera = req.body as {
    deviceCode: string;
    location: string;
    longitude: number;
    latitude: number;
    description: string;
  };
  const createdCamera = new cameraModel({ ...formData });

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
      res.json({
        result: 0,
        ...error,
      });
    });
}

/**
 * 전체 카메라 장치 목록 조회를 위한 API Endpoint. (HTTP GET Reqeust, No Query Params)
 * @param req 클라이언트 Request
 * @param res 클라이언트 측에 전송할 Response
 */
export function retrieveAllCamera(req: Request, res: Response): void {
  cameraModel
    .find()
    .then(cameras => {
      res.json({
        result: 1,
        data: cameras,
      });
    })
    .catch(error => {
      // TODO: 보다 더 적절한 예외 처리
      res.json({
        result: 0,
        ...error,
      });
    });
}

/**
 * 단일 카메라 장치 목록 조회를 위한 API Endpoint. (HTTP GET Reqeust, Query Param Required)
 * @param req 클라이언트 Request
 * @param res 클라이언트 측에 전송할 Response
 * @param next 다음 Middleware로 Context를 위임하기 위한 Express 내장 함수
 */
export function retrieveOneCamera(req: Request, res: Response, next: NextFunction): void {
  const deviceCode = (req.params as { deviceCode: string }).deviceCode;

  cameraModel
    .findOne({ deviceCode: deviceCode })
    .then(camera => {
      // 입력된 일련 번호와 일치하는 카메라가 존재하지 않는 경우
      if (!camera) {
        const error = new CustomError(404, "Not Found");
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
        error = new CustomError(400, "Bad Request");
      }

      next(error);
    });
}
