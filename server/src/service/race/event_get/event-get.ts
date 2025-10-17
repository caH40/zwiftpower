import { PowerCurve } from '../../../Model/PowerCurve.js';
import { ZwiftEvent } from '../../../Model/ZwiftEvent.js';
import { ZwiftSignedRiders } from '../../../Model/ZwiftSignedRiders.js';
import { eventSignedRidersDto } from '../../../dto/eventSignedRiders.dto.js';
import { addPropertyAdditionCP } from '../../../utils/property-additionCP.js';

// types
import {
  EventWithSignedRiders,
  TSignedRidersWithTeam,
} from '../../../types/types.interface.js';
import { sortSignedRiders } from './sort.js';
import { Rider } from '../../../Model/Rider.js';
import { Types } from 'mongoose';
import { addTeamAppearanceToSignedRiders } from '../../preparation/teamAppearance.js';

/**
 * Сервис получение Event (описание) и зарегистрировавшихся райдеров
 */
export async function getEventService(eventId: string) {
  const eventDataDB = await getEventData(eventId);

  if (!eventDataDB) {
    throw new Error(`Заезд id=${eventId} не найден на zwiftpower.ru`);
  }

  // Массив _id подгрупп.
  const subgroupIds = eventDataDB.eventSubgroups.map((subgroup) => subgroup._id);

  // Поиск всех зарегистрированных райдеров в подгруппы.
  const signedRiders = await getSignedRiders(subgroupIds);

  const signedRidersWithTeamAppearance = await addTeamAppearanceToSignedRiders(signedRiders);

  const labelsSubgroup: string[] = eventDataDB.eventSubgroups.map(
    (subgroup) => subgroup.subgroupLabel
  );

  // Сортировка групп по убыванию.
  eventDataDB.eventSubgroups.sort((a, b) => a.label - b.label);

  // Сортировка списка райдеров.
  const signedRidersSorted = sortSignedRiders(signedRidersWithTeamAppearance, labelsSubgroup);

  // zwiftId всех зарегистрированных райдеров
  const zwiftIds = signedRidersSorted.map((rider) => rider.id);

  // добавление powerCurve каждому райдеру
  // получение массива PowerCurves всех райдеров,
  // получение массива racingScore всех райдеров из ранее сохраненных Rider в БД,
  const [powerCurvesDB, riderRacingScoreDB] = await Promise.all([
    PowerCurve.find({
      zwiftId: zwiftIds,
    }).lean(),
    Rider.find(
      {
        zwiftId: zwiftIds,
      },
      { _id: false, zwiftId: true, 'competitionMetrics.racingScore': true }
    ).lean(),
  ]);

  const powerCurvesMap = new Map(powerCurvesDB.map((pc) => [pc.zwiftId, pc]));

  const riderRacingScoreMap = new Map(
    riderRacingScoreDB.map((rs) => [rs.zwiftId, rs.competitionMetrics?.racingScore])
  );

  const signedRidersPowerCurves = signedRidersSorted.map((rider) => {
    // powerCurve для райдера с zwiftId
    const powerCurve = powerCurvesMap.get(rider.id);

    // Добавление рейтинговых очков.
    const racingScore = riderRacingScoreMap.get(rider.id) || 0;

    // Изменение powerCurve на cpBestEfforts.
    const cpBestEfforts = powerCurve ? addPropertyAdditionCP(powerCurve) : undefined;

    return { ...rider, racingScore, cpBestEfforts };
  });

  // Добавление массива с зарегистрированными райдерами в итоговый документ Эвента.

  return eventSignedRidersDto(eventDataDB, signedRidersPowerCurves);
}

async function getSignedRiders(subgroupIds: (Types.ObjectId | undefined)[]) {
  return await ZwiftSignedRiders.find({
    subgroup: subgroupIds,
  })
    .populate({ path: 'team', select: ['urlSlug', 'name', 'shortName', '-_id'] })
    .lean<TSignedRidersWithTeam[]>();
}

async function getEventData(eventId: string) {
  return await ZwiftEvent.findOne({
    id: eventId,
  })
    .populate('eventSubgroups')
    .populate({ path: 'seriesId', select: ['name', 'urlSlug'] })
    .lean<EventWithSignedRiders>();
}
