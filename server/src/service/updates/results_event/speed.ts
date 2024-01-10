import { millisecondsInHour } from '../../../assets/date.js';
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
    // продолжительность заезда
    const durationInHour = result.activityData.durationInMilliseconds / millisecondsInHour;
    const segmentDistanceInKilometers = result.activityData.segmentDistanceInMeters / 1000;

    result.speed = Math.round((100 * segmentDistanceInKilometers) / durationInHour) / 100;
  }
  return results;
}
