import { PointsCalculator } from './PointsCalculator.js';
import { baseRacePointsMap, importanceCoefficients } from '../../assets/racePoints.js';
import { EventResultRepository } from '../../repositories/EventResult.js';

// types
import { TStageResultPoints, ZwiftResultSchema } from '../../types/model.interface.js';
import { TImportanceCoefficientsLevels } from '../../types/points.types.js';
import { TRaceSeriesCategories } from '../../types/types.interface.js';

export class PointsWithOutStageResults {
  pointsCalculator: PointsCalculator = new PointsCalculator();
  private eventResultRepository: EventResultRepository = new EventResultRepository();

  /**
   * Установка очков в заезде не входящем в серию заездов, или где не создаются отдельные результаты для этапов серии.
   */
  calculateAndSetRacePoints = async ({
    results,
    importanceLevel = 'standard',
    hasGroupedResults,
  }: {
    results: ZwiftResultSchema[];
    importanceLevel?: TImportanceCoefficientsLevels;
    hasGroupedResults: boolean;
  }) => {
    const ridersInCategories = hasGroupedResults
      ? this.pointsCalculator.calculateRidersInCategories(results)
      : null;

    const updateQuery = [] as { _id: string; query: { points: TStageResultPoints } }[];

    for (const result of results) {
      // Если у райдера категория null то коэффициент равен 0.
      const subgroupLabel = result.subgroupLabel as TRaceSeriesCategories;

      const participantCount = ridersInCategories
        ? ridersInCategories[subgroupLabel]
        : results.length;

      const massCoefficient = this.pointsCalculator.getMassCoefficient(participantCount);

      const importanceCoefficient =
        importanceCoefficients.find((e) => e.level === importanceLevel)?.coefficient ?? 0;

      //  rank: 8, rankEvent: 8, Где расчетный ранк в заезде/группе?

      const baseRacePoints = baseRacePointsMap.get(result.rankEvent) || 0;

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
    await this.eventResultRepository.updateMany(updateQuery);
  };
}
