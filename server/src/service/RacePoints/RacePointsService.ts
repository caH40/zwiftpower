import { handleAndLogError } from '../../errors/error.js';
import { EventRepository } from '../../repositories/Event.js';
import { EventResultRepository } from '../../repositories/EventResult.js';
import { StageResultRepository } from '../../repositories/StageResult.js';
import { PointsWithOutStageResults } from './PointsWithoutStageResults.js';
import { PointsWithStageResults } from './PointsWithStageResults.js';

// types

/**
 * Класс работы с сущностью очки за место в заезде/группе.
 * @param results - Массив
 */
export class RacePointsService {
  private eventRepository: EventRepository = new EventRepository();
  private eventResultRepository: EventResultRepository = new EventResultRepository();
  private stageResultRepository: StageResultRepository = new StageResultRepository();
  private pointsWithStageResults: PointsWithStageResults = new PointsWithStageResults();
  private pointsWithOutStageResults: PointsWithOutStageResults =
    new PointsWithOutStageResults();

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

        await this.pointsWithStageResults.calculateAndSetRacePoints({
          results,
          importanceLevel: event.importanceLevel,
        });

        return;
      }

      //  Заезды не входящие в серию заездов, или где не создаются отдельные результаты для этапов серии.

      // 1. Определение, общий зачет или деление по категориям. Зависит от типа Эвента.
      const hasGroupedResults = event.typeRaceCustom === 'classicGroup';

      // Результаты заезда.
      const results = await this.eventResultRepository.getByEventId(event._id.toString());

      await this.pointsWithOutStageResults.calculateAndSetRacePoints({
        results,
        importanceLevel: event.importanceLevel,
        hasGroupedResults,
      });
    } catch (error) {
      handleAndLogError(error);
    }
  };
}
