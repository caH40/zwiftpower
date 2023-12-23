import { errorHandler } from '../../../errors/error.js';
import { EventWithSubgroup, ResultEventAdditional } from '../../../types/types.interface.js';

/**
 * Расчет и добавление средней скорости райдера в заезде в результат Райдера
 * расстояние берется из фактически пройденного расстояния segmentDistanceInMeters,
 * а не из дистанции, заданной количеством кругов и лидина
 */
export async function addSpeed(
  results: ResultEventAdditional[],
  event: EventWithSubgroup
): Promise<ResultEventAdditional[]> {
  for (const result of results) {
    // подгруппа, в которой выступал текущий райдер
    const subgroup = event.eventSubgroups.find(
      (elm) => elm.subgroupLabel === result.subgroupLabel
    );

    if (!subgroup) {
      errorHandler(`Не найдена подгруппа в результате eventId:${result.eventId}`);

      continue;
    }
    //время старта подгруппы Эвента
    const eventSubgroupStart = subgroup.eventSubgroupStart;

    const gap = new Date(eventSubgroupStart).getTime() - new Date(event.eventStart).getTime();

    // чистое время заезда
    const timeClear = result.activityData.durationInMilliseconds - gap;

    const speed =
      Math.round(
        (100 * result.activityData.segmentDistanceInMeters) / 1000 / (timeClear / 3600000)
      ) / 100;

    result.speed = speed;
  }
  return results;
}
