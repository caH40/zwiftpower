import mongoose, { Types } from 'mongoose';

import { ZwiftEvent } from '../../../Model/ZwiftEvent.js';

/**
 * Получение данных по Эвентам Серии за выбранный сезон
 * @param type - тип Эвента typeRaceCustom
 */
export const getCurrentEvents = async (
  seriesId: mongoose.Schema.Types.ObjectId
): Promise<Types.ObjectId[]> => {
  return await ZwiftEvent.find({ seriesId }, { _id: true }).lean<Types.ObjectId[]>();
};
