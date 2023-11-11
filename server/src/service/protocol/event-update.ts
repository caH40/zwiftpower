import { Types } from 'mongoose';

import { ZwiftEvent } from '../../Model/ZwiftEvent.js';

// types
import { ResultEventAdditional } from '../../types/types.interface.js';

/**
 * Обновление данных Event: даты обновления и количества финишировавших райдеров
 */
export const setUpdatedToEvent = async (
  resultsSorted: ResultEventAdditional[],
  eventId: Types.ObjectId
) => {
  const totalFinishedCount = resultsSorted.length;
  const updated = Date.now();

  await ZwiftEvent.findOneAndUpdate(
    { _id: eventId },
    { $set: { updated, totalFinishedCount } }
  );
};
