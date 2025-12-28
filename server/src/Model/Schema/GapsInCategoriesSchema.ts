import { Schema } from 'mongoose';

// types
import { TGapsInCategories } from '../../types/model.interface';

// Отрывы между участником результата и лидером, предыдущим в абсолюте и категориях.
export const gapsInCategoriesSchema = new Schema<TGapsInCategories>(
  {
    category: { type: { toLeader: Number, toPrev: Number }, default: null, _id: false },
    absolute: { type: { toLeader: Number, toPrev: Number }, default: null, _id: false },
  },
  { _id: false }
);
