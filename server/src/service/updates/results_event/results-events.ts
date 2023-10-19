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
      // обновление результатов заезда заканчивается после 3х часов после старта
      // isLastUpdate:false в течении 3х часов после старта происходит быстрое обновление результатов
      const { isLastUpdate, needUpdate } = await checkDurationUpdating(event);

      // обновляются результаты после 30 минут после старта и пока  hasResults: false
      // isLastUpdate: true происходит быстрое обновление результатов
      if (needUpdate) {
        await updateResultsEvent(event, isLastUpdate);
      }
    }
  } catch (error) {
    errorHandler(error);
  }
}
