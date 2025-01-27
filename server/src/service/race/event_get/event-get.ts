import { PowerCurve } from '../../../Model/PowerCurve.js';
import { ZwiftEvent } from '../../../Model/ZwiftEvent.js';
import { ZwiftSignedRiders } from '../../../Model/ZwiftSignedRiders.js';
import { eventSignedRidersDto } from '../../../dto/eventSignedRiders.dto.js';
import { addPropertyAdditionCP } from '../../../utils/property-additionCP.js';

// types
import { EventWithSignedRiders } from '../../../types/types.interface.js';
import { sortSignedRiders } from './sort.js';
import { Rider } from '../../../Model/Rider.js';
import { SignedRidersSchema } from '../../../types/model.interface.js';

/**
 * Сервис получение Event (описание) и зарегистрировавшихся райдеров
 */
export async function getEventService(eventId: string) {
  const eventDataDB = await ZwiftEvent.findOne({
    id: eventId,
  })
    .populate('eventSubgroups')
    .lean<EventWithSignedRiders>();

  if (!eventDataDB) {
    throw new Error(`Заезд id=${eventId} не найден на zwiftpower.ru`);
  }

  // Массив _id подгрупп.
  const subgroupIds = eventDataDB.eventSubgroups.map((subgroup) => subgroup._id);

  // Поиск всех зарегистрированных райдеров в подгруппы.
  const signedRiders: SignedRidersSchema[] = await ZwiftSignedRiders.find({
    subgroup: subgroupIds,
  }).lean();

  const labelsSubgroup: string[] = eventDataDB.eventSubgroups.map(
    (subgroup) => subgroup.subgroupLabel
  );

  // Сортировка групп по убыванию.
  eventDataDB.eventSubgroups.sort((a, b) => a.label - b.label);

  // Сортировка списка райдеров.
  const signedRidersSorted = sortSignedRiders(signedRiders, labelsSubgroup);

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

  for (const rider of signedRidersSorted) {
    // powerCurve для райдера с zwiftId
    const powerCurve = powerCurvesMap.get(rider.id);

    // Добавление рейтинговых очков.
    rider.racingScore = riderRacingScoreMap.get(rider.id) || 0;

    // Изменение powerCurve на cpBestEfforts.
    rider.cpBestEfforts = powerCurve ? addPropertyAdditionCP(powerCurve) : undefined;
  }

  // Добавление массива с зарегистрированными райдерами в итоговый документ Эвента.
  eventDataDB.signedRiders = signedRidersSorted;

  return eventSignedRidersDto(eventDataDB);
}
