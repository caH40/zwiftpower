import { handleAndLogError } from '../../errors/error.js';
import { EventRepository } from '../../repositories/Event.js';
import { EventResultRepository } from '../../repositories/EventResult.js';
import { PointsWithOutStageResults } from './PointsWithoutStageResults.js';

// types

/**
 * Класс работы с сущностью очки за место в заезде/группе.
 * @param results - Массив
 */
export class RacePointsService {
  private eventRepository: EventRepository = new EventRepository();
  private eventResultRepository: EventResultRepository = new EventResultRepository();

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

      // Есть отдельные результаты по заездам(этапам).
      // Обрабатывается при обновлении результатов этапов серии.
      if (useStageResults) {
        return;
      }

      // Заезды не входящие в серию заездов, или где не создаются отдельные результаты для этапов серии.

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
