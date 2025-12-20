import { PointsCalculator } from './PointsCalculator.js';
import { baseRacePointsMap, importanceCoefficients } from '../../assets/racePoints.js';
import { StageResultRepository } from '../../repositories/StageResult.js';

// types
import { TStageResult, TStageResultPoints } from '../../types/model.interface.js';
import { TImportanceCoefficientsLevels } from '../../types/points.types.js';

export class PointsWithStageResults {
  pointsCalculator: PointsCalculator = new PointsCalculator();
  private stageResultRepository: StageResultRepository = new StageResultRepository();

  /**
   * Установка очков в заезде, где есть отдельные результаты за этапы.
   */
  calculateAndSetRacePoints = async ({
    results,
    importanceLevel,
  }: {
    results: TStageResult[];
    importanceLevel?: TImportanceCoefficientsLevels;
  }) => {
    const ridersInCategories = this.pointsCalculator.calculateRidersInStageCategories(results);

    const updateQuery = [] as { _id: string; query: { points: TStageResultPoints } }[];

    for (const result of results) {
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

      updateQuery.push({ _id: result._id!.toString(), query: { points } });
    }
    console.log(updateQuery);

    await this.stageResultRepository.updateMany(updateQuery);
  };
}
