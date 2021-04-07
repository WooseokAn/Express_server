import { NextFunction, Request, Response } from "express";
import { Schema } from "mongoose";

import { sectionModel, Section } from "../model/section";
import { recordModel } from "../model/record";
import { CustomError } from "../utils/error";
import { CongestionCalculator } from "../utils/congestion";

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

  sectionModel
    .findOne({ _id: sectionId })
    .then(section => {
      if (!section) {
        const error = new CustomError(404, "Not Found");
        throw error;
      }

      return section as Section;
    })
    .then(async section => {
      const { registeredCameras, totalArea, invalidArea } = section;
      const numberOfCamera = registeredCameras?.length || 0;

      if (numberOfCamera === 0) {
        const error = new CustomError(404, "Not Found");
        throw error;
      }

      // map()을 이용해 Pending 상태의 Promise를 배열애 담고, Promise.all()을 통해 전부 '이행' 시킨다.
      const loadedData = await Promise.all(
        (registeredCameras as Schema.Types.ObjectId[]).map(cameraObjectId => {
          const pendingPromise = recordModel.findOne({ takenBy: cameraObjectId }).sort({ createdAt: -1 });
          // const pendingPromise = recordModel.find({ takenBy: cameraObjectId }).sort({ $natural: -1 }).limit(1);
          return pendingPromise;
        })
      );

      // 이어서 reduce()를 이용해 각 데이터의 계수 값을 누적한다.
      const totalCounts = loadedData.reduce(
        (accumulator, currentValue) => {
          if (currentValue) {
            accumulator.tentCount += currentValue.tentCount;
            accumulator.personCount += currentValue.personCount;
          }

          return accumulator;
        },
        { tentCount: 0, personCount: 0 }
      );

      console.log(totalCounts);

      return { numberOfCamera, totalArea, invalidArea, ...totalCounts } as {
        numberOfCamera: number;
        totalArea: number;
        invalidArea: number;
        tentCount: number;
        personCount: number;
      };
    })
    .then(({ totalArea, invalidArea, tentCount, personCount }) => {
      const congestionCalculator = new CongestionCalculator(totalArea, invalidArea);
      const congestion = congestionCalculator.calculateCongestion(tentCount, personCount);
      const congestionLevel = congestionCalculator.parseCongestion(congestion);

      res.json({
        result: 1,
        counts: {
          tentCount,
          personCount,
        },
        congestion: congestion,
        congestionLevel: congestionLevel,
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
