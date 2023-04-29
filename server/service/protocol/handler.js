import { handlerCatchUp } from './catchup.js';
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
  } catch (error) {
    console.error(error);
  }
}
