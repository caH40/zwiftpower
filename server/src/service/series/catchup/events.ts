import { Types } from 'mongoose';
import { ZwiftEvent } from '../../../Model/ZwiftEvent.js';

// types
import { TotalCatchupSchema } from '../../../types/model.interface.js';

/**
 * Получение данных по Эвентам Серии за выбранный сезон
 * @param type - тип Эвента typeRaceCustom
 * @param seriesData - данные по Серии заездов (дата старта, окончания)
 */
export const getCurrentEvents = async (
  type: string,
  seriesData?: TotalCatchupSchema | null
): Promise<Types.ObjectId[]> => {
  // получение всех эвентов типа type
  // если нет seriesData значит необходимы все результаты

  const eventStart = seriesData
    ? {
        $gte: new Date(seriesData.start).toISOString(),
        $lt: new Date(seriesData.end).toISOString(),
      }
    : /./;

  // получение всех эвентов типа type за определенный сезон
  return await ZwiftEvent.find(
    {
      typeRaceCustom: type,
      eventStart,
    },
    { _id: true }
  ).lean();
};
