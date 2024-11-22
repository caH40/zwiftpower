import { ZwiftEvent } from '../../Model/ZwiftEvent.js';
import { addGapStart } from '../../utils/gap.js';
import { addAgeAndFlag } from './age-and-flag.js';
import { addWattsPerKg } from '../../utils/watts.js';
import { addMainProfileZwiftToRaw } from '../profile_additional/main-add-row.js';
import { setRankResultTotal } from './ranging.js';
import { saveResults } from './results-save.js';
import { setUpdatedToEvent } from './event-update.js';
// фильтры
import { filterByRankCatchup } from './catchup/results-filter.js';
import { filterByRankClassicCommon } from './classic_common/results-filter.js';

// types
import {
  EventWithSubgroup,
  HandlerProtocolArg,
  ResultEventAdditional,
} from '../../types/types.interface.js';
import { filterByRankClassicGroups } from './classic_groups/results-filter.js';

/**
 * Формирование финишного протокола в зависимости от typeRaceCustom и сохранение в БД
 */
export async function handlerProtocol({
  eventId,
  results,
  typeRaceCustom,
}: HandlerProtocolArg) {
  // получение данных Эвента из БД
  const eventDB: EventWithSubgroup | null = await ZwiftEvent.findOne({
    _id: eventId,
  }).populate('eventSubgroups');

  if (!eventDB || !eventDB._id) {
    throw new Error(`Не найден Event с eventId: ${eventId}`);
  }

  // добавление стартовых гэпов к результатам
  const resultsWithStartGap: ResultEventAdditional[] = addGapStart(eventDB, results);

  // добавление данных страны и возраста в результаты райдеров
  const resultsWithAgeAndFlag = await addAgeAndFlag(eventDB, resultsWithStartGap);

  // добавление данных удельной мощности
  const resultsWithWPK = addWattsPerKg(resultsWithAgeAndFlag);

  // добавление данных основного профиля Zwift райдера в результат Эвента
  const resultsWithMainProfiles = await addMainProfileZwiftToRaw(resultsWithWPK);

  //=======================================================
  // Фильтрация категорий, сортировка по финишному времени.
  // Сортировка необходима для последующего проставления места в протоколе (ранкинг).
  // Дисквалификация райдеров с "Виртуальной мощностью"
  let resultsSorted = [] as ResultEventAdditional[];
  switch (typeRaceCustom) {
    case 'catchUp':
      resultsSorted = filterByRankCatchup(resultsWithMainProfiles);
      break;
    case 'newbies':
      resultsSorted = filterByRankClassicGroups(resultsWithMainProfiles);
      break;
    case 'classicGroup':
      resultsSorted = filterByRankClassicGroups(resultsWithMainProfiles);
      break;
    default: // для всех остальных обрабатывать как 'classicCommon'
      resultsSorted = filterByRankClassicCommon(resultsWithMainProfiles);
  }
  //=======================================================

  // установка ранкинга райдерам
  const resultsWithRank = await setRankResultTotal(resultsSorted, typeRaceCustom);

  // сохранение результатов в БД
  await saveResults(eventId, resultsWithRank);

  // обновление данных Event
  await setUpdatedToEvent(resultsWithRank, eventId);
}
