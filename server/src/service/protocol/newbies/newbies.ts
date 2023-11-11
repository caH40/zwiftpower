import { ZwiftEvent } from '../../../Model/ZwiftEvent.js';
import { addWattsPerKg } from '../../../utils/watts.js';
import { addAgeAndFlag } from '../age-and-flag.js';
import { filterByRankNewbies } from './results-filter.js';
import { addMainProfileZwiftToRaw } from '../../profile_additional/main-add-row.js';
import { setRankResultTotal } from '../ranging.js';
import { saveResults } from '../results-save.js';
import { setUpdatedToEvent } from '../event-update.js';

// types
import {
  EventWithSubgroup,
  HandlerProtocolCurrentArg,
} from '../../../types/types.interface.js';

/**
 * Формирование финишного протокола для сохранения в БД, для гонки newbies
 */
export async function handlerNewbies({ eventId, results }: HandlerProtocolCurrentArg) {
  // получение данных Эвента из БД
  const eventDB: EventWithSubgroup | null = await ZwiftEvent.findOne({
    _id: eventId,
  }).populate('eventSubgroups');

  if (!eventDB || !eventDB._id) {
    throw new Error(`Не найден Event с eventId: ${eventId}`);
  }

  // добавление данных страны и возраста в результаты райдеров
  const resultsWithAgeAndFlag = await addAgeAndFlag(eventDB, results);

  // добавление данных удельной мощности
  const resultsWithWPK = addWattsPerKg(resultsWithAgeAndFlag);

  // добавление данных основного профиля Zwift райдера в результат Эвента
  const resultsWithMainProfiles = await addMainProfileZwiftToRaw(resultsWithWPK);

  // фильтрация категорий, сортировка по финишному времени
  // дисквалификация райдеров с "Виртуальной мощностью"
  const resultsSorted = filterByRankNewbies(resultsWithMainProfiles);

  // установка ранкинга райдерам
  const resultsWithRank = await setRankResultTotal(resultsSorted);

  // сохранение результатов в БД
  await saveResults(eventId, resultsWithRank);

  // обновление данных Event
  await setUpdatedToEvent(resultsWithRank, eventId);
}
