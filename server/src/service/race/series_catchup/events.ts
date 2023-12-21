import { ZwiftEvent } from '../../../Model/ZwiftEvent.js';

// types
import { TotalCatchupSchema } from '../../../types/model.interface.js';
import { GetCurrentEventsSeries } from '../../../types/types.interface.js';

/**
 * Получение данных по Эвентам Серии за выбранный сезон
 * @param type - тип Эвента typeRaceCustom
 * @param seriesData - данные по Серии заездов (дата старта, окончания)
 */
export const getCurrentEvents = async (
  type: string,
  seriesData?: TotalCatchupSchema
): Promise<GetCurrentEventsSeries> => {
  // получение всех эвентов типа type
  // если нет seriesData значит необходимы все результаты
  if (!seriesData) {
    return await ZwiftEvent.find(
      { typeRaceCustom: type },
      { _id: true, totalFinishedCount: true, eventStart: true }
    ).lean();
  }

  // получение всех эвентов типа type за определенный сезон
  return await ZwiftEvent.find(
    {
      typeRaceCustom: type,
      eventStart: {
        $gte: new Date(seriesData.start).toISOString(),
        $lt: new Date(seriesData.end).toISOString(),
      },
    },
    { _id: true, totalFinishedCount: true, eventStart: true }
  ).lean();
};
