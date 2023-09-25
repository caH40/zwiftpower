import { PowerCurve } from '../../Model/PowerCurve.js';
import { ZwiftEvent } from '../../Model/ZwiftEvent.js';
import { ZwiftSignedRiders } from '../../Model/ZwiftSignedRiders.js';
import { errorHandler } from '../../errors/error.js';
import { eventSignedRidersDto } from '../../dto/eventSignedRiders.dto.js';
import { addPropertyAdditionCP } from '../../utils/property-additionCP.js';

// types
import { EventWithSignedRiders, SignedRidersPowerCurves } from '../../types/types.interface.js';
import { PowerCurveSchema } from '../../types/model.interface.js';

/**
 * Сервис получение Event (описание) и зарегистрировавшихся райдеров
 */
export async function getEventService(eventId: string) {
  try {
    const eventDataDB: EventWithSignedRiders | null = await ZwiftEvent.findOne({
      id: eventId,
    })
      .populate('eventSubgroups')
      .lean();

    if (!eventDataDB) {
      return null;
    }

    /**
     * Поиск и добавление в массив всех зарегистрированных райдеров в подгруппы
     */
    const signedRiders: SignedRidersPowerCurves[] = [];
    for (const subgroup of eventDataDB.eventSubgroups) {
      const ridersInGroup: SignedRidersPowerCurves[] = await ZwiftSignedRiders.find({
        subgroup: subgroup._id,
      }).lean();

      signedRiders.push(...ridersInGroup);
    }

    // сортировка групп по убыванию
    eventDataDB.eventSubgroups.sort((a, b) => a.label - b.label);
    // сортировка списка райдеров по убыванию категории
    signedRiders.sort((a, b) =>
      a.subgroupLabel.toLowerCase().localeCompare(b.subgroupLabel.toLowerCase())
    );

    // добавление powerCurve каждому райдеру
    const powerCurvesDB: PowerCurveSchema[] = await PowerCurve.find();

    for (const rider of signedRiders) {
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

    eventDataDB.signedRiders = signedRiders;

    return eventSignedRidersDto(eventDataDB);
  } catch (error) {
    errorHandler(error);
    return null;
  }
}
