import { ZwiftEvent } from '../../Model/ZwiftEvent.js';
import { handlerProtocol } from '../protocol/handler.js';
import { addCriticalPowers } from '../race/criticalpower.js';
import { getResults } from '../race/results.js';

import { checkDurationUpdating } from './results-check.js';

// обновление всех результатов заездов из Звифта
export async function updateResults() {
  try {
    const eventsDB = await ZwiftEvent.find({
      $and: [{ started: true }, { hasResults: false }],
    }).populate('eventSubgroups');

    for (const event of eventsDB) {
      await checkDurationUpdating(event); // обновление результатов заезда заканчивается после 2х часов после старта
      await updateResultsEvent(event);
    }
  } catch (error) {
    console.error(error);
  }
}

export async function updateResultsEvent(event) {
  const resultsTotal = [];
  for (const subgroup of event.eventSubgroups) {
    const resultsSubgroup = await getResults(
      { subgroup_id: subgroup._id, subgroupId: subgroup.id },
      subgroup.subgroupLabel
    );
    resultsTotal.push(...resultsSubgroup);
  }

  const resultsWithCP = await addCriticalPowers(resultsTotal);

  await handlerProtocol(event._id, resultsWithCP, event.typeRaceCustom);
}
