import { ZwiftEvent } from '../../Model/ZwiftEvent.js';
import { handlerProtocol } from '../protocol/handler.js';
import { getAccessToken } from '../zwift/token.js';
import { getResults } from './results.js';

export async function putResultsService(eventId) {
  try {
    const token = await getAccessToken();
    if (!token) throw { message: 'Ошибка при получении токена' };

    const eventsDB = await ZwiftEvent.findOne({ id: eventId }).populate('eventSubgroups');

    const resultsTotal = [];
    for (const subgroup of eventsDB.eventSubgroups) {
      const resultsSubgroup = await getResults(
        { subgroup_id: subgroup._id, subgroupId: subgroup.id },
        subgroup.subgroupLabel,
        token
      );
      resultsTotal.push(...resultsSubgroup);
    }
    await handlerProtocol(eventsDB._id, resultsTotal, eventsDB.typeRaceCustom);
    return { message: `Обновлены результаты заезда "${eventsDB.name}"` };
  } catch (error) {
    throw error;
  }
}
