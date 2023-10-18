import { ZwiftEvent } from '../../../Model/ZwiftEvent.js';
import { errorHandler } from '../../../errors/error.js';
import { checkDurationUpdating } from '../results-check.js';
import { updateResultsEvent } from './result-event.js';

// types
import { EventWithSubgroup } from '../../../types/types.interface.js';

/**
 * Обновление всех результатов Эвентов которые не имеют результатов ( hasResults: false )
 */
export async function updateResults() {
  try {
    // hasResults:true - прекращение обновлять результаты
    const eventsDB: EventWithSubgroup[] = await ZwiftEvent.find({
      $and: [{ started: true }, { hasResults: false }],
    }).populate('eventSubgroups');

    for (const event of eventsDB) {
      // обновление результатов заезда заканчивается после 2х часов после старта
      await checkDurationUpdating(event);
      await updateResultsEvent(event);
    }
  } catch (error) {
    errorHandler(error);
  }
}
