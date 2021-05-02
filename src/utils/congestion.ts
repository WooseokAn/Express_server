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

  private _tentMargin = 2;
  private _tentArea = 4;
  private _tentAccruacy = 0.9309;
  private _peopleMargin = 1;
  private _peopleArea = 2;
  private _peopleAccurary = 0.8264;

  constructor(totalArea: number, invalidArea: number) {
    this.totalArea = totalArea;
    this.invalidArea = invalidArea;
  }

  private _getValidArea(): number {
    return this.totalArea - this.invalidArea;
  }

  private _getTotalArea(count: number, area: number, margin: number, accruacy: number): number {
    const oneSide = Math.sqrt(area);
    const correctionFactor = 2 - accruacy;
    const marginatedArea = (oneSide + margin) ** 2; // 실제 면적에 마진값을 반영해 총 면적 계산
    const correctedCount = count * correctionFactor;
    return correctedCount * marginatedArea;
  }

  public parseCongestion(congestion: number): CongestionLevel {
    const evaluatedValue = Math.round(congestion);

    let congestionLevel;

    /**
     * 혼잡: 혼잡도 70 이상
     * 보통: 혼잡도 30 이상, 70 미만
     * 여유: 혼잡도 30 미만
     */
    if (evaluatedValue >= 70) {
      congestionLevel = CongestionLevel.CONGESTED;
    } else if (30 <= evaluatedValue && evaluatedValue < 70) {
      congestionLevel = CongestionLevel.MODERATE;
    } else {
      congestionLevel = CongestionLevel.LIGHT;
    }

    return congestionLevel;
  }

  public calculateCongestion(tentCount: number, peopleCount: number): number {
    const validArea = this._getValidArea();
    const areaTakenByPeople = this._getTotalArea(
      peopleCount,
      this._peopleArea,
      this._peopleMargin,
      this._peopleAccurary
    );
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
