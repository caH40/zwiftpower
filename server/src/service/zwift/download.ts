import { ZwiftEvent } from '../../Model/ZwiftEvent.js';
import { getResults } from './results.js';
import { addAgeAndFlag } from '../protocol/age-and-flag.js';
import { getTokenForEvent } from '../race/token.js';

// types
import { EventWithSubgroup, ResultEventAdditional } from '../../types/types.interface.js';

/**
 * Получение результатов Эвента для скачивания
 */
export async function getZwiftEventResultsService(eventId: string) {
  const eventDB: EventWithSubgroup | null = await ZwiftEvent.findOne({ id: eventId }).populate(
    'eventSubgroups'
  );

  if (!eventDB) {
    throw new Error(`Не найден Event ${eventId}`);
  }

  const token = await getTokenForEvent({
    organizerLabel: eventDB.organizer,
    organizerId: eventDB.organizerId,
  });

  const resultsTotal = [] as ResultEventAdditional[];
  for (const subgroup of eventDB.eventSubgroups) {
    const subgroupObj = { subgroup_id: subgroup._id, subgroupId: subgroup.id };

    const resultsSubgroup = await getResults({
      subgroupObj,
      subgroupLabel: subgroup.subgroupLabel,
      token,
    });
    resultsTotal.push(...resultsSubgroup);
  }

  // добавление данных страны и возраста в результаты райдеров
  const results = await addAgeAndFlag(eventDB, resultsTotal);

  return { results };
}
