import { handlerCatchUp } from './catchup.js';

export async function handlerProtocol(eventId, results, typeRaceCustom) {
  try {
    if (typeRaceCustom === 'catchUp') {
      await handlerCatchUp(eventId, results);
      return;
    }
  } catch (error) {
    console.error(error);
  }
}
