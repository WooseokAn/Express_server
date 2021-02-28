import { NextFunction, Request, Response } from "express";
import { sectionModel, Section } from "../model/section";
import { CustomError } from "../utils/error";

/**
 * 신규 구역 등록을 위한 API Endpoint. (HTTP POST Reqeust)
 * @param req 클라이언트 Request
 * @param res 클라이언트 측에 전송할 Response
 */
export function createSection(req: Request, res: Response): void {
  const formData: Section = req.body as {
    description: string;
    totalArea: number;
    invalidArea: number;
    centerLatitude: number;
    centerLongitude: number;
  };

  const newSection = new sectionModel({ ...formData });

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
      res.json({
        result: 0,
        ...error,
      });
    });
}

/**
 * 등록된 전체 구역 목록 조회를 위한 API Endpoint. (HTTP GET Reqeust)
 * @param req 클라이언트 Request
 * @param res 클라이언트 측에 전송할 Response
 */
export function retrieveAllSection(req: Request, res: Response): void {
  sectionModel
    .find()
    .then(sections => {
      res.json({
        result: 1,
        data: sections,
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
 * 등록된 단일 구역 정보 조회를 위한 API Endpoint. (HTTP GET Reqeust, Query Param Required)
 * @param req 클라이언트 Request
 * @param res 클라이언트 측에 전송할 Response
 * @param next 다음 Middleware로 Context를 위임하기 위한 Express 내장 함수
 */
export function retrieveOneSection(req: Request, res: Response, next: NextFunction): void {
  const sectionId = (req.params as { sectionId: string }).sectionId;

  sectionModel
    .findOne({ _id: sectionId })
    .then(section => {
      // 입력된 일련 번호와 일치하는 카메라가 존재하지 않는 경우
      if (!section) {
        const error = new CustomError(404, "Not Found");
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
        error = new CustomError(400, "Bad Request");
      }

      next(error);
    });
}

/**
 * 등록된 단일 구역의 혼잡도 정보 조회를 위한 API Endpoint. (HTTP GET Reqeust, Query Param Required)
 * @param req 클라이언트 Request
 * @param res 클라이언트 측에 전송할 Response
 * @param next 다음 Middleware로 Context를 위임하기 위한 Express 내장 함수
 */
export function retrieveCongestion(req: Request, res: Response, next: NextFunction): void {
  const sectionId = (req.params as { sectionId: string }).sectionId;

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
