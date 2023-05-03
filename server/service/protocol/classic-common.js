import { ZwiftEvent } from '../../Model/ZwiftEvent.js';
import { addWattsPerKg } from '../../utility/watts.js';
import { addAgeAndFlag } from './age-and-flag.js';
import { saveDocument } from './data-save.js';

// формирует финишный протокол для сохранения в БД, для гонки CatchUp
export async function handlerClassicCommon(eventId, results) {
  try {
    const eventDB = await ZwiftEvent.findOne({ _id: eventId }).populate('eventSubgroups');

    const resultsWithAgeAndFlag = await addAgeAndFlag(eventDB, results);
    const resultsWithWPK = addWattsPerKg(resultsWithAgeAndFlag);

    resultsWithWPK.sort(
      (a, b) => a.activityData.durationInMilliseconds - b.activityData.durationInMilliseconds
    );

    let rankEvent = 0;
    for (const result of resultsWithWPK) {
      rankEvent += 1;
      await saveDocument(eventDB._id, result, rankEvent);
    }

    eventDB.totalFinishedCount = resultsWithWPK.length;
    eventDB.updated = Date.now();
    await eventDB.save();
  } catch (error) {
    throw error;
  }
}
