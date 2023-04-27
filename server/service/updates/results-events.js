import { ZwiftEvent } from '../../Model/ZwiftEvent.js';
import { handlerProtocol } from '../protocol/handler.js';
import { getResults } from '../race/results.js';
import { getAccessToken } from '../zwift/token.js';

// обновление результатов заезда из Звифта
export async function updateResults() {
  try {
    const token = await getAccessToken();
    if (!token) throw { message: 'Ошибка при получении токена' };

    const eventsDB = await ZwiftEvent.find({
      $and: [{ started: true }, { hasResults: false }],
    }).populate('eventSubgroups');

    for (const event of eventsDB) {
      const resultsTotal = [];
      for (const subgroup of event.eventSubgroups) {
        const resultsSubgroup = await getResults(subgroup.id, subgroup.subgroupLabel, token);
        resultsTotal.push(...resultsSubgroup);
      }
      await handlerProtocol(resultsTotal, event._id, event.typeRaceCustom);
    }
  } catch (error) {
    console.error(error);
  }
}
