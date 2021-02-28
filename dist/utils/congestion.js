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
var CongestionCalculator = /** @class */ (function () {
    function CongestionCalculator(totalArea, invalidArea, numberOfCamera) {
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
    Object.defineProperty(CongestionCalculator.prototype, "tentArea", {
        get: function () {
            return this._tentArea;
        },
        set: function (newVal) {
            if (0 < newVal && newVal < 6)
                this._tentArea = newVal;
            else
                throw new Error("[ERROR] Invalid Value for 'tentArea' Field in CongestionCalculator");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CongestionCalculator.prototype, "peopleArea", {
        get: function () {
            return this._peopleArea;
        },
        set: function (newVal) {
            if (0 < newVal && newVal < 4)
                this._peopleArea = newVal;
            else
                throw new Error("[ERROR] Invalid Value for 'peopleArea' Field in CongestionCalculator");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CongestionCalculator.prototype, "cameraWeight", {
        get: function () {
            return this._cameraWeight;
        },
        set: function (newVal) {
            if (1 < newVal && newVal < 2)
                this._cameraWeight = newVal;
            else
                throw new Error("[ERROR] Invalid Value for 'peopleArea' Field in CongestionCalculator");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CongestionCalculator.prototype, "peopleWeight", {
        get: function () {
            return this._peopleWeight;
        },
        set: function (newVal) {
            if (1 < newVal && newVal < 2)
                this._peopleWeight = newVal;
            else
                throw new Error("[ERROR] Invalid Value for 'peopleArea' Field in CongestionCalculator");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CongestionCalculator.prototype, "criteria", {
        get: function () {
            return this._criteria;
        },
        set: function (newVal) {
            if (0 < newVal && newVal < 100)
                this._criteria = newVal;
            else
                throw new Error("[ERROR] Invalid Value for 'peopleArea' Field in CongestionCalculator");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CongestionCalculator.prototype, "accruacy", {
        get: function () {
            return this._accruacy;
        },
        set: function (newVal) {
            if (1 < newVal && newVal < 2)
                this._accruacy = newVal;
            else
                throw new Error("[ERROR] Invalid Value for 'accruacy' Field in CongestionCalculator");
        },
        enumerable: false,
        configurable: true
    });
    CongestionCalculator.prototype.calculateAvailableArea = function () {
        return this.totalArea - this.invalidArea;
    };
    CongestionCalculator.prototype.calculateTotalTentArea = function (tentCount) {
        return tentCount * this.tentArea;
    };
    CongestionCalculator.prototype.calculateTotalPeopleArea = function (peopleCount) {
        return peopleCount * this.peopleArea * this.peopleWeight;
    };
    CongestionCalculator.prototype.parseCongestion = function (congestion) {
        var evaluatedValue = congestion / this.criteria;
        var congestionLevel;
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
    };
    CongestionCalculator.prototype.calculateCongestion = function (tentCount, peopleCount) {
        var availableArea = this.calculateAvailableArea();
        var takenArea = this.calculateTotalPeopleArea(peopleCount) + this.calculateTotalTentArea(tentCount);
        var congestion = this.accruacy * ((this.cameraWeight * this.numberOfCamera * takenArea) / availableArea) * 100;
        return congestion;
    };
    return CongestionCalculator;
}());
exports.CongestionCalculator = CongestionCalculator;
