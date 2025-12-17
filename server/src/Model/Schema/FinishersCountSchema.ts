import { Schema } from 'mongoose';

// types
import { TFinishersCount } from '../../types/types.interface';

/**
 * Сущность в результате заезда или этапа, количество финишировавших в группе в которой участвовал райдер и в абсолютном зачете.
 */
export const finishersCountSchema = new Schema<TFinishersCount>(
  {
    category: { type: Number },
    absolute: { type: Number },
  },
  { _id: false }
);
