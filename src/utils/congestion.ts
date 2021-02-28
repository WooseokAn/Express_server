enum CongestionLevel {
  EMPTY,
  LIGHT,
  MODERATE,
  CONGESTED,
}

export class CongestionCalculator {
  private totalArea: number;
  private invalidArea: number;
  private numberOfCamera: number;

  private _tentArea = 4;

  get tentArea(): number {
    return this._tentArea;
  }

  set tentArea(newVal: number) {
    if (0 < newVal && newVal < 6) this._tentArea = newVal;
    else throw new Error("[ERROR] Invalid Value for 'tentArea' Field in CongestionCalculator");
  }

  private _peopleArea = 2;

  get peopleArea(): number {
    return this._peopleArea;
  }

  set peopleArea(newVal: number) {
    if (0 < newVal && newVal < 4) this._peopleArea = newVal;
    else throw new Error("[ERROR] Invalid Value for 'peopleArea' Field in CongestionCalculator");
  }

  private _cameraWeight = 1.25;

  get cameraWeight(): number {
    return this._cameraWeight;
  }

  set cameraWeight(newVal: number) {
    if (1 < newVal && newVal < 2) this._cameraWeight = newVal;
    else throw new Error("[ERROR] Invalid Value for 'peopleArea' Field in CongestionCalculator");
  }

  private _peopleWeight = 1.6;

  get peopleWeight(): number {
    return this._peopleWeight;
  }

  set peopleWeight(newVal: number) {
    if (1 < newVal && newVal < 2) this._peopleWeight = newVal;
    else throw new Error("[ERROR] Invalid Value for 'peopleArea' Field in CongestionCalculator");
  }

  private _criteria = 50;

  get criteria(): number {
    return this._criteria;
  }

  set criteria(newVal: number) {
    if (0 < newVal && newVal < 100) this._criteria = newVal;
    else throw new Error("[ERROR] Invalid Value for 'peopleArea' Field in CongestionCalculator");
  }

  private _accruacy = 1.1;

  get accruacy(): number {
    return this._accruacy;
  }

  set accruacy(newVal: number) {
    if (1 < newVal && newVal < 2) this._accruacy = newVal;
    else throw new Error("[ERROR] Invalid Value for 'accruacy' Field in CongestionCalculator");
  }

  constructor(totalArea: number, invalidArea: number, numberOfCamera: number) {
    this.totalArea = totalArea;
    this.invalidArea = invalidArea;
    this.numberOfCamera = numberOfCamera;
  }

  private calculateAvailableArea(): number {
    return this.totalArea - this.invalidArea;
  }

  private calculateTotalTentArea(tentCount: number): number {
    return tentCount * this.tentArea;
  }

  private calculateTotalPeopleArea(peopleCount: number): number {
    return peopleCount * this.peopleArea * this.peopleWeight;
  }

  public parseCongestion(congestion: number): CongestionLevel {
    const evaluatedValue = congestion / this.criteria;

    let congestionLevel;

    if (evaluatedValue >= 0.5) {
      congestionLevel = CongestionLevel.CONGESTED;
    } else if (evaluatedValue < 0.5 && evaluatedValue >= 0.3) {
      congestionLevel = CongestionLevel.MODERATE;
    } else if (evaluatedValue < 0.3 && evaluatedValue > 0.1) {
      congestionLevel = CongestionLevel.LIGHT;
    } else {
      congestionLevel = CongestionLevel.EMPTY;
    }

    return congestionLevel;
  }

  public calculateCongestion(tentCount: number, peopleCount: number): number {
    const availableArea = this.calculateAvailableArea();
    const takenArea = this.calculateTotalPeopleArea(peopleCount) + this.calculateTotalTentArea(tentCount);
    const congestion = this.accruacy * ((this.cameraWeight * this.numberOfCamera * takenArea) / availableArea) * 100;

    return congestion;
  }
}
