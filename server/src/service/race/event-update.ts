// types
import { ZwiftEvent } from '../../Model/ZwiftEvent.js';
import { ZwiftEventSubgroup } from '../../Model/ZwiftEventSubgroup.js';
import { eventDataFromZwiftAPI } from '../../types/zwiftAPI/eventsDataFromZwift.interface.js';

// types
import { ZwiftEventSchema } from '../../types/model.interface.js';

/**
 * Обновление данных Эвента, данных подгрупп в БД
 */
export async function updateEventAndSubgroups(
  event: eventDataFromZwiftAPI
): Promise<ZwiftEventSchema> {
  const { eventSubgroups, ...eventData } = event;

  // получение массива с id подгрупп в Эвенте
  const subgroupIds = eventSubgroups.map((subgroup) => subgroup.id);

  // удаление подгрупп в в Эвенте
  await ZwiftEventSubgroup.deleteMany({ id: subgroupIds });

  // сохранение новых подгрупп в Эвенте
  const subgroupsSaved = await ZwiftEventSubgroup.insertMany(eventSubgroups);

  // обновление данны Эвента и данных подгрупп в БД
  const eventUpdated = await ZwiftEvent.findOneAndUpdate(
    { id: eventData.id },
    { ...eventData, eventSubgroups: subgroupsSaved }
  );

  if (!eventUpdated) {
    throw new Error(`Не найден обновляемый Эвент с id:${event.id}`);
  }

  return eventUpdated;
}
