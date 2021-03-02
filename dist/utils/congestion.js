"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CongestionCalculator = void 0;
var CongestionLevel;
(function (CongestionLevel) {
    CongestionLevel[CongestionLevel["EMPTY"] = 0] = "EMPTY";
    CongestionLevel[CongestionLevel["LIGHT"] = 1] = "LIGHT";
    CongestionLevel[CongestionLevel["MODERATE"] = 2] = "MODERATE";
    CongestionLevel[CongestionLevel["CONGESTED"] = 3] = "CONGESTED";
})(CongestionLevel || (CongestionLevel = {}));
class CongestionCalculator {
    constructor(totalArea, invalidArea, numberOfCamera) {
        this._tentArea = 4;
        this._peopleArea = 2;
        this._cameraWeight = 1.25;
        this._peopleWeight = 1.6;
        this._criteria = 50;
        this._accruacy = 1.1;
        this.totalArea = totalArea;
        this.invalidArea = invalidArea;
        this.numberOfCamera = numberOfCamera;
    }
    get tentArea() {
        return this._tentArea;
    }
    set tentArea(newVal) {
        if (0 < newVal && newVal < 6)
            this._tentArea = newVal;
        else
            throw new Error("[ERROR] Invalid Value for 'tentArea' Field in CongestionCalculator");
    }
    get peopleArea() {
        return this._peopleArea;
    }
    set peopleArea(newVal) {
        if (0 < newVal && newVal < 4)
            this._peopleArea = newVal;
        else
            throw new Error("[ERROR] Invalid Value for 'peopleArea' Field in CongestionCalculator");
    }
    get cameraWeight() {
        return this._cameraWeight;
    }
    set cameraWeight(newVal) {
        if (1 < newVal && newVal < 2)
            this._cameraWeight = newVal;
        else
            throw new Error("[ERROR] Invalid Value for 'peopleArea' Field in CongestionCalculator");
    }
    get peopleWeight() {
        return this._peopleWeight;
    }
    set peopleWeight(newVal) {
        if (1 < newVal && newVal < 2)
            this._peopleWeight = newVal;
        else
            throw new Error("[ERROR] Invalid Value for 'peopleArea' Field in CongestionCalculator");
    }
    get criteria() {
        return this._criteria;
    }
    set criteria(newVal) {
        if (0 < newVal && newVal < 100)
            this._criteria = newVal;
        else
            throw new Error("[ERROR] Invalid Value for 'peopleArea' Field in CongestionCalculator");
    }
    get accruacy() {
        return this._accruacy;
    }
    set accruacy(newVal) {
        if (1 < newVal && newVal < 2)
            this._accruacy = newVal;
        else
            throw new Error("[ERROR] Invalid Value for 'accruacy' Field in CongestionCalculator");
    }
    calculateAvailableArea() {
        return this.totalArea - this.invalidArea;
    }
    calculateTotalTentArea(tentCount) {
        return tentCount * this.tentArea;
    }
    calculateTotalPeopleArea(peopleCount) {
        return peopleCount * this.peopleArea * this.peopleWeight;
    }
    parseCongestion(congestion) {
        const evaluatedValue = congestion / this.criteria;
        let congestionLevel;
        if (evaluatedValue >= 0.5) {
            congestionLevel = CongestionLevel.CONGESTED;
        }
        else if (evaluatedValue < 0.5 && evaluatedValue >= 0.3) {
            congestionLevel = CongestionLevel.MODERATE;
        }
        else if (evaluatedValue < 0.3 && evaluatedValue > 0.1) {
            congestionLevel = CongestionLevel.LIGHT;
        }
        else {
            congestionLevel = CongestionLevel.EMPTY;
        }
        return congestionLevel;
    }
    calculateCongestion(tentCount, peopleCount) {
        const availableArea = this.calculateAvailableArea();
        const takenArea = this.calculateTotalPeopleArea(peopleCount) + this.calculateTotalTentArea(tentCount);
        const congestion = this.accruacy * ((this.cameraWeight * this.numberOfCamera * takenArea) / availableArea) * 100;
        return congestion;
    }
}
exports.CongestionCalculator = CongestionCalculator;
