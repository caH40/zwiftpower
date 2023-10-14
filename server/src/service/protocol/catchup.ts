import { ZwiftEvent } from '../../Model/ZwiftEvent.js';
import { addGapStart } from '../../utils/gap.js';
import { addWattsPerKg } from '../../utils/watts.js';
import { addAgeAndFlag } from './age-and-flag.js';

// types
import { EventWithSubgroup, HandlerProtocolCurrentArg } from '../../types/types.interface.js';
import { setRankResult } from './ranging.js';
import { addMainProfileZwiftToRaw } from '../profile_additional/main-add-row.js';

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

  // добавление данных основного профиля Zwift райдера в результат Эвента
  const resultsWithMainProfiles = await addMainProfileZwiftToRaw(resultsWithWPK);

  // Установка ранкинга райдерам. Сортировка по финишному времени.
  // Сохранение результатов в БД
  await setRankResult(eventDB, resultsWithMainProfiles);

  // обновление данных Event
  const totalFinishedCount = resultsWithMainProfiles.length;
  const updated = Date.now();

  await ZwiftEvent.findOneAndUpdate(
    { _id: eventDB._id },
    { $set: { updated, totalFinishedCount } }
  );
}
