import { ZwiftEvent } from '../../Model/ZwiftEvent.js';
import { addGapStart } from '../../utility/gap.js';
import { addWattsPerKg } from '../../utility/watts.js';
import { addAgeAndFlag } from './age-and-flag.js';
import { saveDocument } from './data-save.js';

// types
import { EventWithSubgroup, HandlerProtocolCurrentArg } from '../../types/types.interface.js';

/**
 * Формирует финишный протокол для сохранения в БД, для гонки CatchUp
 */
export async function handlerCatchUp({ eventId, results }: HandlerProtocolCurrentArg) {
  const eventDB: EventWithSubgroup | null = await ZwiftEvent.findOne({
    _id: eventId,
  }).populate('eventSubgroups');

  if (!eventDB || !eventDB._id) {
    throw new Error(`Не найден Event с eventId: ${eventId}`);
  }

  // Добавление стартовых гэпов к результатам
  const resultsWithStartGap = addGapStart(eventDB, results);
  const resultsWithAgeAndFlag = await addAgeAndFlag(eventDB, resultsWithStartGap);
  const resultsWithWPK = addWattsPerKg(resultsWithAgeAndFlag);

  resultsWithWPK.sort(
    (a, b) => a.activityData.durationInMilliseconds - b.activityData.durationInMilliseconds
  );

  let rankEvent = 0;
  for (const result of resultsWithWPK) {
    rankEvent += 1;
    await saveDocument({ eventId: eventDB._id, result, rankEvent });
  }

  // обновление данных Event
  const totalFinishedCount = resultsWithWPK.length;
  const updated = Date.now();

  await ZwiftEvent.findOneAndUpdate(
    { _id: eventDB._id },
    { $set: { updated, totalFinishedCount } }
  );
}
