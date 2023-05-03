import { ZwiftEvent } from '../../../Model/ZwiftEvent.js';
import { addWattsPerKg } from '../../../utility/watts.js';
import { addAgeAndFlag } from '../age-and-flag.js';
import { saveDocument } from '../data-save.js';
import { filterByRank } from './results-filter.js';

// формирует финишный протокол для сохранения в БД, для гонки newbies
export async function handlerNewbies(eventId, results) {
  try {
    const eventDB = await ZwiftEvent.findOne({ _id: eventId }).populate('eventSubgroups');

    const resultsWithAgeAndFlag = await addAgeAndFlag(eventDB, results);
    const resultsWithWPK = addWattsPerKg(resultsWithAgeAndFlag);

    const resultsSorted = filterByRank(resultsWithWPK);

    let rankEvent = 0;
    for (const result of resultsSorted) {
      if (result.subgroupLabel === 'C' || result.subgroupLabel === 'D') {
        rankEvent += 1;
      } else {
        rankEvent = 0; // всем группам кроме C,D присваивается место в протоколе равное 0
      }
      await saveDocument(eventDB._id, result, rankEvent);
    }

    eventDB.totalFinishedCount = resultsSorted.length;
    eventDB.updated = Date.now();
    await eventDB.save();
  } catch (error) {
    throw error;
  }
}
