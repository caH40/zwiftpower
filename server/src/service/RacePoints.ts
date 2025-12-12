import { baseRacePointsMap, importanceCoefficients } from '../assets/racePoints.js';
import { handleAndLogError } from '../errors/error.js';
import { EventRepository } from '../repositories/Event.js';
import { StageResultRepository } from '../repositories/StageResult.js';
import { calculateZpruFinishPoints, getMassCoefficient } from '../utils/points.js';

// types
import { TImportanceCoefficientsLevels } from '../types/points.types.js';
import { TRaceSeriesCategories } from '../types/types.interface.js';
import { TStageResult, TStageResultPoints } from '../types/model.interface.js';

/**
 * Класс работы с сущностью очки за место в заезде/группе.
 * @param results - Массив
 */
export class RacePoints {
  private eventRepository: EventRepository = new EventRepository();
  private stageResultRepository: StageResultRepository = new StageResultRepository();

  /**
   *  Установка очков за финишное место райдерам в заезде eventId.
   */
  setPoints = async (eventId: string): Promise<void> => {
    try {
      const event = await this.eventRepository.getSeriesInfo(eventId);

      if (!event) {
        throw new Error(`Не найден Эвент с _id: "${eventId}"`);
      }

      // Есть ли отдельные результаты по заездам (этапам) серии.
      // Если заезд не принадлежит серии, то у него будет false.
      const series = event.seriesId;
      const seriesId = series?._id?.toString();
      const useStageResults = series && seriesId && !!series.useStageResults;

      if (useStageResults) {
        // Есть отдельные результаты по заездам(этапам).
        const stageOrder = event.seriesId?.stages.find((s) => s.event.equals(eventId))?.order;

        if (stageOrder === undefined) {
          throw new Error(
            `Не найден этап с eventId: "${eventId}" в массиве этапов серии с _id: "${event.seriesId?._id}"`
          );
        }

        // Результаты этапа.
        const results = await this.stageResultRepository.getAllStageResultsByEventId(
          seriesId,
          stageOrder
        );

        await this.setPointsWithStageResults({
          results,
          importanceLevel: event.importanceLevel,
        });
        console.log(results);
      } else {
        // Нет отдельных результатов по заездам(этапам).
        await this.setPointsWithoutStageResults();
      }
    } catch (error) {
      handleAndLogError(error);
    }
  };

  /**
   * Установка очков в заезде, где есть отдельные результаты за этапы.
   */
  private setPointsWithStageResults = async ({
    results,
    importanceLevel,
  }: {
    results: TStageResult[];
    importanceLevel?: TImportanceCoefficientsLevels;
  }) => {
    console.log(results);

    const ridersInCategories = this.calculateRidersInCategories(results);

    const updateQuery = [] as { _id: string; query: { points: TStageResultPoints } }[];

    for (const result of results) {
      // Если у райдера категория null то коэффициент равен 0.
      const massCoefficient = result.category
        ? getMassCoefficient(ridersInCategories[result.category])
        : 0;

      const importanceCoefficient =
        importanceCoefficients.find((e) => e.level === importanceLevel)?.coefficient ?? 0;

      const baseRacePoints = baseRacePointsMap.get(result.rank.category) || 0;

      const zpruPoints = calculateZpruFinishPoints({
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

    await this.stageResultRepository.updateMany(updateQuery);
  };

  private setPointsWithoutStageResults = () => {};

  /**
   * Расчет количества райдеров в категориях, если зачет по категориям.
   */
  private calculateRidersInCategories = (
    stageResults: TStageResult[]
  ): Record<TRaceSeriesCategories, number> => {
    const counters = {} as Record<TRaceSeriesCategories, number>;

    stageResults.forEach((result) => {
      const { category } = result;
      if (category) {
        counters[category] = counters[category] ? counters[category] + 1 : 1;
      }
    });

    return counters;
  };
}
