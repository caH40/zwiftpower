// types
import { ZwiftEvent } from '../../Model/ZwiftEvent.js';
import { ZwiftEventSubgroup } from '../../Model/ZwiftEventSubgroup.js';
import { eventDataFromZwiftAPI } from '../../types/zwiftAPI/eventsDataFromZwift.interface.js';
import { countDistance } from '../../utils/distance.js';

// types
import { ZwiftEventSchema } from '../../types/model.interface.js';
import { EventSubgroupFromZwiftAPIAdditional } from '../../types/types.interface.js';

/**
 * Обновление данных Эвента, данных подгрупп в БД
 */
export async function updateEventAndSubgroups(
  event: eventDataFromZwiftAPI
): Promise<ZwiftEventSchema> {
  const { eventSubgroups: temp, ...eventData } = event;

  // для типизации добавляемого свойства distanceSummary
  const eventSubgroups = temp as EventSubgroupFromZwiftAPIAdditional[];

  // получение массива с id подгрупп в Эвенте
  const subgroupIds = eventSubgroups.map((subgroup) => subgroup.id);

  // удаление подгрупп в в Эвенте
  await ZwiftEventSubgroup.deleteMany({ id: subgroupIds });

  // Расчет общей дистанции и набора высоты согласно маршрута и количества кругов
  for (const eventSubgroup of eventSubgroups) {
    const { distanceInKilometers, elevationGainInMeters } = countDistance(eventSubgroup);
    eventSubgroup.distanceSummary = { distanceInKilometers, elevationGainInMeters };
  }

  // сохранение новых подгрупп в Эвенте
  const subgroupsSaved = await ZwiftEventSubgroup.insertMany(eventSubgroups);

  const updated = new Date().getTime();
  // обновление данны Эвента и данных подгрупп в БД
  const eventUpdated = await ZwiftEvent.findOneAndUpdate(
    { id: eventData.id },
    {
      ...eventData,
      eventSubgroups: subgroupsSaved,
      updated,
    }
  );

  if (!eventUpdated) {
    throw new Error(`Не найден обновляемый Эвент с id:${event.id}`);
  }

  return eventUpdated;
}
