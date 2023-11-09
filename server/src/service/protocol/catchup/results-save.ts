import { Types } from 'mongoose';

import { saveDocument } from '../data-save.js';

// types
import { ResultEventAdditional } from '../../../types/types.interface.js';

/**
 * Отправка результатов (по одному) на сохранение в БД
 */
export const saveResults = async (
  eventId: Types.ObjectId,
  results: ResultEventAdditional[]
) => {
  for (const result of results) {
    await saveDocument({
      eventId,
      result: result,
    });
  }
};
