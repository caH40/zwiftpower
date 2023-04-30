import { handlerCatchUp } from './catchup.js';
import { handlerClassicCommon } from './classic-common.js';
import { handlerNewbies } from './newbies/newbies.js';

// выбор соответствующего обработчика результатов согласно типу гонки
export async function handlerProtocol(eventId, results, typeRaceCustom) {
  try {
    if (typeRaceCustom === 'catchUp') {
      await handlerCatchUp(eventId, results);
      return;
    }
    if (typeRaceCustom === 'newbies') {
      await handlerNewbies(eventId, results);
      return;
    }
    if (typeRaceCustom === 'classicCommon') {
      await handlerClassicCommon(eventId, results);
      return;
    }
  } catch (error) {
    throw error;
  }
}
