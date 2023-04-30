import { ZwiftEvent } from '../../Model/ZwiftEvent.js';
import { handlerProtocol } from '../protocol/handler.js';
import { getResults } from '../race/results.js';
import { getAccessToken } from '../zwift/token.js';
import { checkDurationUpdating } from './results-check.js';

// обновление всех результатов заездов из Звифта
export async function updateResults() {
  try {
    const token = await getAccessToken();
    if (!token) throw { message: 'Ошибка при получении токена' };

    const eventsDB = await ZwiftEvent.find({
      $and: [{ started: true }, { hasResults: false }],
    }).populate('eventSubgroups');

    for (const event of eventsDB) {
      await checkDurationUpdating(event); // обновление результатов заезда заканчивается после 2х часов после старта

      const resultsTotal = [];
      for (const subgroup of event.eventSubgroups) {
        const resultsSubgroup = await getResults(
          { subgroup_id: subgroup._id, subgroupId: subgroup.id },
          subgroup.subgroupLabel,
          token
        );
        resultsTotal.push(...resultsSubgroup);
      }
      await handlerProtocol(event._id, resultsTotal, event.typeRaceCustom);
    }
  } catch (error) {
    console.error(error);
  }
}
