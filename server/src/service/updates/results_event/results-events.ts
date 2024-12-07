import { ZwiftEvent } from '../../../Model/ZwiftEvent.js';
import { errorHandler } from '../../../errors/error.js';
import { checkDurationUpdating } from '../results-check.js';
import { updateResultsEvent } from './result-event.js';
import { millisecondsIn2Hours, millisecondsIn30Minutes } from '../../../assets/date.js';

// types
import { EventWithSubgroup } from '../../../types/types.interface.js';
import { getTokenForEvent } from '../../race/token.js';

/**
 * Обновление всех результатов Эвентов которые не имеют результатов ( hasResults: false )
 */
export async function updateResults() {
  try {
    // hasResults:true - прекращение обновлять результаты
    const eventsDB: EventWithSubgroup[] = await ZwiftEvent.find({
      $and: [{ started: true }, { hasResults: false }],
    }).populate('eventSubgroups');

    const timeForUpdateResults = millisecondsIn2Hours;
    const delayBeforeUpdating = millisecondsIn30Minutes;

    for (const event of eventsDB) {
      // обновление результатов заезда заканчивается после timeForUpdateResults миллисекунд после старта
      // isLastUpdate:false в течении timeForUpdateResults после старта происходит быстрое обновление результатов
      const { isLastUpdate, needUpdate } = await checkDurationUpdating(
        event,
        timeForUpdateResults,
        delayBeforeUpdating
      );

      // обновляются результаты после 30 минут после старта и пока  hasResults: false
      // isLastUpdate: true происходит быстрое обновление результатов
      if (needUpdate) {
        // быстро обновлять результаты, если не последнее обновление
        const token = await getTokenForEvent({
          organizerLabel: event.organizer,
          organizerId: event.organizerId,
        });
        const isFast = !isLastUpdate;
        await updateResultsEvent(event, token, isFast);
      }
    }
  } catch (error) {
    errorHandler(error);
  }
}
