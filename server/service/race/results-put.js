import { ZwiftEvent } from '../../Model/ZwiftEvent.js';
import { handlerProtocol } from '../protocol/handler.js';
import { addCriticalPowers } from './criticalpower.js';

import { getResults } from './results.js';

// ручное обновление результатов по запросу модератора
export async function putResultsService(eventId) {
  try {
    const eventsDB = await ZwiftEvent.findOne({ id: eventId }).populate('eventSubgroups');

    const resultsTotal = [];
    for (const subgroup of eventsDB.eventSubgroups) {
      const resultsSubgroup = await getResults(
        { subgroup_id: subgroup._id, subgroupId: subgroup.id },
        subgroup.subgroupLabel
      );
      resultsTotal.push(...resultsSubgroup);
    }

    const resultsWithCP = await addCriticalPowers(resultsTotal);

    await handlerProtocol(eventsDB._id, resultsWithCP, eventsDB.typeRaceCustom);
    return { message: `Обновлены результаты заезда "${eventsDB.name}"` };
  } catch (error) {
    throw error;
  }
}
