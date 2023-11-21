import { ZwiftEvent } from '../../../Model/ZwiftEvent.js';
import { ZwiftEventSubgroup } from '../../../Model/ZwiftEventSubgroup.js';

// types
import { EventWithSubgroup } from '../../../types/types.interface.js';

/**
 * Проверка на уникальность id Эвента и id подгрупп
 */
export async function checkUnique(event: EventWithSubgroup): Promise<void> {
  // проверка на уникальность id нового заезда
  const hasEvent = await ZwiftEvent.findOne({ id: event.id });
  if (hasEvent) {
    throw new Error(`Event с id=${event.id} уже есть в БД`);
  }

  // проверка на уникальность id групп нового заезда
  for (const eventSubgroup of event.eventSubgroups) {
    const hasSubGroup = await ZwiftEventSubgroup.findOne({ id: eventSubgroup.id });
    if (hasSubGroup) {
      throw new Error(`SubGroup с id=${eventSubgroup.id} уже есть в БД`);
    }
  }
}
