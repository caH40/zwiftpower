import { ZwiftEvent } from '../../Model/ZwiftEvent.js';
import { getResultsCatchup } from '../preparation/catchup.js';
import { getResultsClassicCommon } from '../preparation/classic-common.js';
import { getResultsClassicGroups } from '../preparation/classic-groups.js';

// types
import { EventWithSubgroup } from '../../types/types.interface.js';
import { eventResultsDto } from '../../dto/eventResults.dto.js';
import { addRacingScores } from '../preparation/racingscore.js';
import { addTeamAppearance } from '../preparation/teamAppearance.js';

/**
 * Получение результатов райдеров в Эвенте из БД
 */
export async function getResultsService(eventId: number) {
  const eventDB = await ZwiftEvent.findOne({ id: eventId })
    .populate('eventSubgroups')
    .populate({ path: 'seriesId', select: ['name', 'urlSlug'] })
    .lean<EventWithSubgroup>();

  if (!eventDB) {
    throw new Error(`Заезд id=${eventId} не найден на zwiftpower.ru`);
  }

  let eventPrepared = {} as EventWithSubgroup;

  switch (eventDB.typeRaceCustom) {
    case 'catchUp':
      eventPrepared = await getResultsCatchup(eventDB);
      break;
    case 'newbies':
      eventPrepared = await getResultsClassicGroups(eventDB);
      break;
    case 'classicGroup':
      eventPrepared = await getResultsClassicGroups(eventDB);
      break;
    default: // все остальные обрабатывать как 'classicCommon'
      eventPrepared = await getResultsClassicCommon(eventDB);
  }

  await addRacingScores(eventPrepared);

  const resultsWithTeamAppearance = await addTeamAppearance(eventPrepared.results);

  return eventResultsDto({
    event: { ...eventPrepared, results: resultsWithTeamAppearance },
    message: 'Эвент с результаты заезда',
  });
}
