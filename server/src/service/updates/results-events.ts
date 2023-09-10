import { ZwiftEvent } from '../../Model/ZwiftEvent.js';
import { EventWithSubgroup } from '../../types/types.interface.js';
import { handlerProtocol } from '../protocol/handler.js';
import { addCriticalPowers } from '../race/criticalpower.js';
import { getResults } from '../zwift/results.js';

import { checkDurationUpdating } from './results-check.js';

// обновление всех результатов заездов из Звифта
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
    console.error(error);
  }
}

/**
 * Ручное обновление результатов по запросу модератора
 */
export async function updateResultsEvent(event: EventWithSubgroup) {
  try {
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

    if (!event._id) {
      throw new Error(`Не найден event._id ${event._id}`);
    }
    if (!resultsWithCP) {
      throw new Error(`Не найден resultsWithCP ${resultsWithCP}`);
    }

    const handlerProtocolArg = {
      eventId: event._id,
      results: resultsWithCP,
      typeRaceCustom: event.typeRaceCustom,
    };
    await handlerProtocol(handlerProtocolArg);
  } catch (error) {
    console.log(error);
  }
}