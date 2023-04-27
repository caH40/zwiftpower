import { handlerCatchUp } from './catchup.js';

export async function handlerProtocol(results, zwiftEventId, eventParams) {
  try {
    if (eventParams.typeRaceCustom === 'catchUp') {
      await handlerCatchUp(results);
      return;
    }
  } catch (error) {
    console.error(error);
  }
}
