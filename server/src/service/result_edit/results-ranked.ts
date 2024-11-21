import { Types } from 'mongoose';

import { ZwiftResult } from '../../Model/ZwiftResult.js';
import { handlerCatchUpModified } from './handlers/catchup.js';
import { handlerDefaultModified } from './handlers/default.js';
import { handlerClassicGroups } from './handlers/classic-groups.js';

// types
import { ZwiftResultSchema } from '../../types/model.interface.js';

/**
 * Изменение ранкингов Райдеров в результатах Эвента
 * изменять rankEvent согласно типу заезда typeRaceCustom, дисквалификаций, новым категориям райдеров
 */
export const changeRankResults = async (
  eventId: Types.ObjectId,
  typeRaceCustom: string
): Promise<void> => {
  // получение всех результатов Эвента eventId
  const resultsDB: ZwiftResultSchema[] = await ZwiftResult.find({
    zwiftEventId: eventId,
  }).lean();

  switch (typeRaceCustom) {
    case 'catchUp':
      await handlerCatchUpModified(resultsDB);
      break;
    case 'newbies':
      await handlerClassicGroups(resultsDB);
      break;
    case 'classicGroup':
      await handlerClassicGroups(resultsDB);
      break;

    default: // для всех остальных обрабатывать как 'classicCommon'
      await handlerDefaultModified(resultsDB);
  }
};
