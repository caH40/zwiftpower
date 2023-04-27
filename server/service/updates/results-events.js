import { ZwiftEvent } from '../../Model/ZwiftEvent.js';
import { getResults } from '../race/results.js';
import { getAccessToken } from '../zwift/token.js';

// обновление результатов заезда из Звифта
export async function updateResults() {
  try {
    const token = await getAccessToken();
    if (!token) throw { message: 'Ошибка при получении токена' };

    const resultsTotal = [];
    const eventsDB = await ZwiftEvent.find({
      $and: [{ started: true }, { hasResults: false }],
    }).populate('eventSubgroups');
    for (const event of eventsDB) {
      for (const subgroup of event.eventSubgroups) {
        const resultsSubgroup = await getResults(subgroup.id, subgroup.subgroupLabel, token);
        resultsTotal.push(...resultsSubgroup);
      }
    }

    console.log(resultsTotal);
  } catch (error) {
    console.error(error);
  }
}
