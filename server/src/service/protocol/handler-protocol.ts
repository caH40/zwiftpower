import { ZwiftEvent } from '../../Model/ZwiftEvent.js';
import { addGapStart } from '../../utils/gap.js';
import { addAgeAndFlag } from './age-and-flag.js';
import { addWattsPerKg } from '../../utils/watts.js';
import { addMainProfileZwiftToRaw } from '../profile_additional/main-add-row.js';
import { setRankResultTotal } from './ranging.js';
import { saveResults } from './results-save.js';
import { setUpdatedToEvent } from './event-update.js';

// types
import {
  EventWithSubgroup,
  HandlerProtocolArg,
  ResultEventAdditional,
} from '../../types/types.interface.js';

import { setDSQWithVirtualPower } from './virtual-power.js';
import { addTeamInResults } from '../updates/results_event/team-add.js';
import { countFinishers } from '../../utils/countFinishers.js';

/**
 * Формирование финишного протокола в зависимости от typeRaceCustom и сохранение в БД
 */
export async function handlerProtocol({
  eventId,
  results,
  typeRaceCustom,
}: HandlerProtocolArg) {
  // получение данных Эвента из БД
  const eventDB = await ZwiftEvent.findOne({
    _id: eventId,
  })
    .populate('eventSubgroups')
    .lean<EventWithSubgroup>();

  if (!eventDB || !eventDB._id) {
    throw new Error(`Не найден Event с eventId: ${eventId}`);
  }

  // добавление стартовых гэпов к результатам
  const resultsWithStartGap: ResultEventAdditional[] = addGapStart(eventDB, results);

  // добавление данных страны и возраста в результаты райдеров
  const resultsWithAgeAndFlag = await addAgeAndFlag(eventDB, resultsWithStartGap);

  // Добавление информации о принадлежности райдера к команде.
  const resultsWithTeams = await addTeamInResults(resultsWithAgeAndFlag);

  // добавление данных удельной мощности
  const resultsWithWPK = addWattsPerKg(resultsWithTeams);

  // добавление данных основного профиля Zwift райдера в результат Эвента
  const resultsWithMainProfiles = await addMainProfileZwiftToRaw(resultsWithWPK);

  // установка данных дисквалификации при использовании VirtualPower
  const resultsWithVP = resultsWithMainProfiles.map((result) => setDSQWithVirtualPower(result));

  // установка ранкинга райдерам
  const resultsWithRank = await setRankResultTotal(resultsWithVP, typeRaceCustom);

  // Добавление количества финишировавших в группе, где участвовал райдер и абсолюте.
  countFinishers(typeRaceCustom, resultsWithRank);

  // сохранение результатов в БД
  await saveResults(eventId, resultsWithRank);

  // обновление данных Event
  await setUpdatedToEvent(resultsWithRank, eventId);
}
