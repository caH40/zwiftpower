import { ZwiftEvent } from '../../../Model/ZwiftEvent.js';
import { addWattsPerKg } from '../../../utils/watts.js';
import { addAgeAndFlag } from '../age-and-flag.js';
import { saveDocument } from '../data-save.js';
import { filterByRank } from './results-filter.js';
import { addMainProfileZwiftToRaw } from '../../profile_additional/main-add-row.js';

// types
import {
  EventWithSubgroup,
  HandlerProtocolCurrentArg,
} from '../../../types/types.interface.js';

/**
 * Формирование финишного протокола для сохранения в БД, для гонки newbies
 */
export async function handlerNewbies({ eventId, results }: HandlerProtocolCurrentArg) {
  const eventDB: EventWithSubgroup | null = await ZwiftEvent.findOne({ _id: eventId }).populate(
    'eventSubgroups'
  );

  if (!eventDB || !eventDB._id) {
    throw new Error(`Не найден Event с eventId: ${eventId}`);
  }

  /**
   * Добавление флага страны и возраст каждому райдеру в его результат
   */
  const resultsWithAgeAndFlag = await addAgeAndFlag(eventDB, results);

  /**
   *
   */
  const resultsWithWPK = addWattsPerKg(resultsWithAgeAndFlag);

  const resultsSorted = filterByRank(resultsWithWPK);

  // добавление данных основного профиля Zwift райдера в результат Эвента
  const resultsWithMainProfiles = await addMainProfileZwiftToRaw(resultsSorted);

  let rankEvent = 0;
  for (const result of resultsWithMainProfiles) {
    if (result.subgroupLabel === 'C' || result.subgroupLabel === 'D') {
      rankEvent += 1;
    } else {
      rankEvent = 0; // всем группам кроме C,D присваивается место в протоколе равное 0
    }

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
