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
        this._tentMargin = 2;
        this._tentArea = 4;
        this._tentAccruacy = 0.9309;
        this._peopleMargin = 1;
        this._peopleArea = 2;
        this._peopleAccurary = 0.8264;
        this.totalArea = totalArea;
        this.invalidArea = invalidArea;
    }
    _getValidArea() {
        return this.totalArea - this.invalidArea;
    }
    _getTotalArea(count, area, margin, accruacy) {
        const oneSide = Math.sqrt(area);
        const correctionFactor = 2 - accruacy;
        const marginatedArea = Math.pow((oneSide + margin), 2); // 실제 면적에 마진값을 반영해 총 면적 계산
        const correctedCount = count * correctionFactor;
        return correctedCount * marginatedArea;
    }
    parseCongestion(congestion) {
        const evaluatedValue = Math.round(congestion);
        let congestionLevel;
        /**
         * 혼잡: 혼잡도 70 이상
         * 보통: 혼잡도 30 이상, 70 미만
         * 여유: 혼잡도 30 미만
         */
        if (evaluatedValue >= 70) {
            congestionLevel = CongestionLevel.CONGESTED;
        }
        else if (30 <= evaluatedValue && evaluatedValue < 70) {
            congestionLevel = CongestionLevel.MODERATE;
        }
        else {
            congestionLevel = CongestionLevel.LIGHT;
        }
        return congestionLevel;
    }
    calculateCongestion(tentCount, peopleCount) {
        const validArea = this._getValidArea();
        const areaTakenByPeople = this._getTotalArea(peopleCount, this._peopleArea, this._peopleMargin, this._peopleAccurary);
        const areaTakenByTents = this._getTotalArea(tentCount, this._tentArea, this._tentMargin, this._tentAccruacy);
        // 전체 측정 면적(validArea)을 실측정 면적(areaTakenByPeople + areaTakenByTents)으로 나눈 값
        const correctionFactor = validArea / (areaTakenByPeople + areaTakenByTents);
        const totalTakenArea = (areaTakenByPeople + areaTakenByTents) * correctionFactor;
        console.log({
            validArea: validArea,
            peopleArea: areaTakenByPeople,
            tentArea: areaTakenByTents,
            totalTakenArea: totalTakenArea,
        });
        return (totalTakenArea / validArea) * 100;
    }
}
exports.CongestionCalculator = CongestionCalculator;
