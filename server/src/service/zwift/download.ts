import { ZwiftEvent } from '../../Model/ZwiftEvent.js';
import { getResults } from './results.js';

// types
import { EventWithSubgroup } from '../../types/types.interface.js';

export async function getZwiftEventResultsService(eventId: string) {
  const eventDB: EventWithSubgroup | null = await ZwiftEvent.findOne({ id: eventId }).populate(
    'eventSubgroups'
  );

  if (!eventDB) {
    throw new Error(`Не найден Event ${eventId}`);
  }

  const resultsTotal = [];
  for (const subgroup of eventDB.eventSubgroups) {
    const subgroupObj = { subgroup_id: subgroup._id, subgroupId: subgroup.id };

    const resultsSubgroup = await getResults({
      subgroupObj,
      subgroupLabel: subgroup.subgroupLabel,
    });
    resultsTotal.push(...resultsSubgroup);
  }

  return { results: resultsTotal };
}
