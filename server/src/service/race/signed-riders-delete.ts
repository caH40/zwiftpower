import { ZwiftEvent } from '../../Model/ZwiftEvent.js';
import { ZwiftSignedRiders } from '../../Model/ZwiftSignedRiders.js';

/**
 * Удаление зарегистрированных райдеров в подгрупах Эвента из БД
 */
export async function deleteSignedRiders(eventId: number): Promise<void> {
  const eventDB = await ZwiftEvent.findOne({ id: eventId }, { eventSubgroups: true });

  if (!eventDB) {
    throw new Error(`Не найден обновляемый Эвент с id:${eventId}`);
  }

  // получение массива с id подгрупп в Эвенте
  const subgroupIds = eventDB.eventSubgroups;

  // удаление зарегистрированных райдеров из подгрупп subgroupIds
  for (const id of subgroupIds) {
    await ZwiftSignedRiders.deleteMany({ subgroup: id });
  }
}
