import { ZwiftEvent } from '../../Model/ZwiftEvent.js';
import { getResults } from '../race/results.js';

export async function getZwiftEventResultsService(eventId, userId) {
  try {
    const eventDB = await ZwiftEvent.findOne({ id: eventId }).populate('eventSubgroups');
    // логирование действия
    if (userId) {
      const description = 'updateEventResultsInDB';
      const { id, name, eventStart } = eventDB;
      await loggingAdmin(id, name, eventStart, userId, description);
    }

    const resultsTotal = [];
    for (const subgroup of eventDB.eventSubgroups) {
      const resultsSubgroup = await getResults(
        { subgroup_id: subgroup._id, subgroupId: subgroup.id },
        subgroup.subgroupLabel
      );
      resultsTotal.push(...resultsSubgroup);
    }

    return { results: resultsTotal };
  } catch (error) {
    throw error;
  }
}
