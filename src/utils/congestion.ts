enum CongestionLevel {
  LIGHT,
  MODERATE,
  CONGESTED,
}

/**
 * {(사람 계수 값 * 사람 YOLO 보정치 * 사람 면적) +  (텐트 계수 값 * 텐트 YOLO 보정치 * 텐트 면적)} * (카메라 면적 보정치)
 */

export class CongestionCalculator {
  private totalArea: number;
  private invalidArea: number;

  private _margin = 1;
  private _tentArea = 4;
  private _tentAccruacy = 0.9309;
  private _peopleArea = 2;
  private _peopleAccurary = 0.8264;

  constructor(totalArea: number, invalidArea: number) {
    this.totalArea = totalArea;
    this.invalidArea = invalidArea;
  }

  private _getValidArea(): number {
    return this.totalArea - this.invalidArea;
  }

  private _getTotalArea(count: number, area: number, accruacy: number): number {
    const oneSide = Math.sqrt(area);
    const correctionFactor = 2 - accruacy;

    const marginatedArea = (oneSide + this._margin) ** 2;
    const correctedCount = count * correctionFactor;
    return correctedCount * marginatedArea;
  }

  public parseCongestion(congestion: number): CongestionLevel {
    const evaluatedValue = Math.round(congestion);

    let congestionLevel;

    if (evaluatedValue > 100) {
      congestionLevel = CongestionLevel.CONGESTED;
    } else if (70 < evaluatedValue && evaluatedValue <= 100) {
      congestionLevel = CongestionLevel.MODERATE;
    } else {
      congestionLevel = CongestionLevel.LIGHT;
    }

    return congestionLevel;
  }

  public calculateCongestion(tentCount: number, peopleCount: number): number {
    const validArea = this._getValidArea();
    const areaTakenByPeople = this._getTotalArea(peopleCount, this._peopleArea, this._peopleAccurary);
    const areaTakenByTents = this._getTotalArea(tentCount, this._tentArea, this._tentAccruacy);
    const correctionFactor = 1.1;

    const totalTakenArea = (areaTakenByPeople + areaTakenByTents) * correctionFactor;

    return (totalTakenArea / validArea) * 100;
  }
}
