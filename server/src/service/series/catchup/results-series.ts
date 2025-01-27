import { Types } from 'mongoose';
import { ZwiftResult } from '../../../Model/ZwiftResult.js';

// types
import { ResultWithEventAndSubgroup } from '../../../types/types.interface.js';

/**
 * Получение результатов райдеров всех currentEvents Эвентов
 * @param currentEvents -  данные Эвентов Серии за выбранный сезон
 */
export async function getResultsSeriesRaw(
  currentEvents: Types.ObjectId[]
): Promise<ResultWithEventAndSubgroup[]> {
  return await ZwiftResult.find(
    {
      zwiftEventId: currentEvents,
      rankEvent: 1,
    },
    {
      subgroupId: true,
      zwiftEventId: true,
      activityData: true,
      eventId: true,
      subgroupLabel: true,
      profileDataMain: true,
      profileData: true,
      profileId: true,
      speed: true,
    }
  )
    .populate({
      path: 'subgroupId',
      select: [
        'id',
        'label',
        'laps',
        'distanceInMeters',
        'durationInSeconds',
        'distanceSummary',
        'mapId',
        'name',
        'routeId',
      ],
    })
    .populate({
      path: 'zwiftEventId',
      select: ['eventStart', 'totalFinishedCount', 'eventSubgroups'],
      populate: [{ path: 'eventSubgroups', select: ['eventSubgroupStart', 'subgroupLabel'] }],
    })

    .lean<ResultWithEventAndSubgroup[]>();
}
