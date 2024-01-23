import { PowerCurve } from '../../../Model/PowerCurve.js';
import { ZwiftEvent } from '../../../Model/ZwiftEvent.js';
import { ZwiftSignedRiders } from '../../../Model/ZwiftSignedRiders.js';
import { eventSignedRidersDto } from '../../../dto/eventSignedRiders.dto.js';
import { addPropertyAdditionCP } from '../../../utils/property-additionCP.js';

// types
import {
  EventWithSignedRiders,
  SignedRidersPowerCurves,
} from '../../../types/types.interface.js';
import { PowerCurveSchema } from '../../../types/model.interface.js';
import { sortSignedRiders } from './sort.js';

/**
 * Сервис получение Event (описание) и зарегистрировавшихся райдеров
 */
export async function getEventService(eventId: string) {
  const eventDataDB: EventWithSignedRiders | null = await ZwiftEvent.findOne({
    id: eventId,
  })
    .populate('eventSubgroups')
    .lean();

  if (!eventDataDB) {
    throw new Error(`Заезд id=${eventId} не найден на zwiftpower.ru`);
  }

  // Поиск и добавление в массив всех зарегистрированных райдеров в подгруппы
  const labelsSubgroup: string[] = [];
  const signedRiders: SignedRidersPowerCurves[] = [];
  for (const subgroup of eventDataDB.eventSubgroups) {
    const ridersInGroup: SignedRidersPowerCurves[] = await ZwiftSignedRiders.find({
      subgroup: subgroup._id,
    }).lean();
    labelsSubgroup.push(subgroup.subgroupLabel);
    signedRiders.push(...ridersInGroup);
  }

  // сортировка групп по убыванию
  eventDataDB.eventSubgroups.sort((a, b) => a.label - b.label);

  // сортировка списка райдеров
  const signedRidersSorted = sortSignedRiders(signedRiders, labelsSubgroup);

  // zwiftId всех зарегистрированных райдеров
  const zwiftIds = signedRidersSorted.map((rider) => rider.id);

  // добавление powerCurve каждому райдеру
  // получение массива PowerCurves всех райдеров,
  // что бы не делать запрос для каждого райдера по отдельности
  const powerCurvesDB: PowerCurveSchema[] = await PowerCurve.find({
    zwiftId: zwiftIds,
  });

  for (const rider of signedRidersSorted) {
    // powerCurve для райдера с zwiftId
    const powerCurve = powerCurvesDB.find((cp) => cp.zwiftId === rider.id);

    if (!powerCurve) {
      rider.cpBestEfforts = undefined;
      continue;
    }
    // изменение powerCurve на cpBestEfforts
    const cpBestEfforts = addPropertyAdditionCP(powerCurve);

    rider.cpBestEfforts = cpBestEfforts;
  }

  eventDataDB.signedRiders = signedRidersSorted;

  return eventSignedRidersDto(eventDataDB);
}
