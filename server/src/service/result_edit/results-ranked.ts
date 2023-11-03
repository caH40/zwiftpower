import { Types } from 'mongoose';

import { ZwiftResult } from '../../Model/ZwiftResult.js';
import { handlerCatchUpModified } from './handlers/catchup.js';

// types
import { ZwiftResultSchema } from '../../types/model.interface.js';
// import { handlerClassicCommonModified } from './handlers/classic-common.js';
// import { handlerNewbiesModified } from './handlers/newbies.js';

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
    // case 'newbies':
    //   await handlerNewbiesModified({ eventId, results });
    //   break;
    // default: // для всех остальных обрабатывать как 'classicCommon'
    //   await handlerClassicCommonModified({ eventId, results });
  }
};
