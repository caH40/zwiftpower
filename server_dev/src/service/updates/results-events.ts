import { ZwiftEvent } from '../../Model/ZwiftEvent.js';
import { EventWithSubgroup } from '../../types/types.interface.js';
import { handlerProtocol } from '../protocol/handler.js';
import { addCriticalPowers } from '../race/criticalpower.js';
import { getResults } from '../zwift/results.js';

import { checkDurationUpdating } from './results-check.js';

// обновление всех результатов заездов из Звифта
export async function updateResults() {
  try {
    const eventsDB: EventWithSubgroup[] = await ZwiftEvent.find({
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

/**
 * Ручное обновление результатов по запросу модератора
 */
export async function updateResultsEvent(event: EventWithSubgroup) {
  const resultsTotal = [];

  for (const subgroup of event.eventSubgroups) {
    const subgroupObj = { subgroup_id: subgroup._id, subgroupId: subgroup.id };

    // получение результатов заезда из Звифта
    const resultsSubgroup = await getResults({
      subgroupObj,
      subgroupLabel: subgroup.subgroupLabel,
    });
    resultsTotal.push(...resultsSubgroup);
  }

  // добавление CP в результаты райдеров
  const nameAndDate = { name: event.name, eventStart: new Date(event.eventStart).getTime() };
  const resultsWithCP = await addCriticalPowers(resultsTotal, nameAndDate);

  await handlerProtocol(event._id, resultsWithCP, event.typeRaceCustom);
}
