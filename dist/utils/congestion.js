"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CongestionCalculator = void 0;
var CongestionLevel;
(function (CongestionLevel) {
    CongestionLevel[CongestionLevel["LIGHT"] = 0] = "LIGHT";
    CongestionLevel[CongestionLevel["MODERATE"] = 1] = "MODERATE";
    CongestionLevel[CongestionLevel["CONGESTED"] = 2] = "CONGESTED";
})(CongestionLevel || (CongestionLevel = {}));
/**
 * {(사람 계수 값 * 사람 YOLO 보정치 * 사람 면적) +  (텐트 계수 값 * 텐트 YOLO 보정치 * 텐트 면적)} * (카메라 면적 보정치)
 */
class CongestionCalculator {
    constructor(totalArea, invalidArea) {
        this._margin = 1;
        this._tentArea = 4;
        this._tentAccruacy = 0.9309;
        this._peopleArea = 2;
        this._peopleAccurary = 0.8264;
        this.totalArea = totalArea;
        this.invalidArea = invalidArea;
    }
    _getValidArea() {
        return this.totalArea - this.invalidArea;
    }
    _getTotalArea(count, area, accruacy) {
        const oneSide = Math.sqrt(area);
        const correctionFactor = 2 - accruacy;
        const marginatedArea = Math.pow((oneSide + this._margin), 2);
        const correctedCount = count * correctionFactor;
        return correctedCount * marginatedArea;
    }
    parseCongestion(congestion) {
        const evaluatedValue = Math.round(congestion);
        let congestionLevel;
        if (evaluatedValue > 100) {
            congestionLevel = CongestionLevel.CONGESTED;
        }
        else if (70 < evaluatedValue && evaluatedValue <= 100) {
            congestionLevel = CongestionLevel.MODERATE;
        }
        else {
            congestionLevel = CongestionLevel.LIGHT;
        }
        return congestionLevel;
    }
    calculateCongestion(tentCount, peopleCount) {
        const validArea = this._getValidArea();
        const areaTakenByPeople = this._getTotalArea(peopleCount, this._peopleArea, this._peopleAccurary);
        const areaTakenByTents = this._getTotalArea(tentCount, this._tentArea, this._tentAccruacy);
        const correctionFactor = 1.1;
        const totalTakenArea = (areaTakenByPeople + areaTakenByTents) * correctionFactor;
        return (totalTakenArea / validArea) * 100;
    }
}
exports.CongestionCalculator = CongestionCalculator;
