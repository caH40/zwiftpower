import { baseRacePointsMap, importanceCoefficients } from '../../../assets/racePoints.js';
import { PointsCalculator } from '../../RacePoints/PointsCalculator.js';

// types
import { TStageResult } from '../../../types/model.interface.js';
import { TImportanceCoefficientsLevels } from '../../../types/points.types.js';

/**
 * Класс работы с сущностью очки за место на этапе серии.
 * @param results - Массив
 */
export class StageRacePointsService {
  pointsCalculator = new PointsCalculator();

  /**
   * Расчет и установка очков за этап серии заездов.
   */
  calculateAndSetRacePoints = ({
    results,
    importanceLevel,
  }: {
    results: TStageResult[];
    importanceLevel?: TImportanceCoefficientsLevels;
  }): TStageResult[] => {
    const ridersInCategories = this.pointsCalculator.calculateRidersInStageCategories(results);

    const resultsWithPoints = results.map((result) => {
      // Если у райдера категория null то коэффициент равен 0.
      const massCoefficient = result.category
        ? this.pointsCalculator.getMassCoefficient(ridersInCategories[result.category])
        : 0;

      const importanceCoefficient =
        importanceCoefficients.find((e) => e.level === importanceLevel)?.coefficient ?? 0;

      const baseRacePoints = baseRacePointsMap.get(result.rank.category) || 0;

      const zpruPoints = this.pointsCalculator.calculateZpruFinishPoints({
        baseRacePoints,
        massCoefficient,
        importanceCoefficient,
      });

      // Устанавливаются очки в результат.
      const points = result.points
        ? { ...result.points, zpruFinishPoints: zpruPoints }
        : { zpruFinishPoints: zpruPoints };

      return { ...result, points };
    });

    return resultsWithPoints;
  };
}
