import { ZwiftEvent } from '../../../Model/ZwiftEvent.js';

// types
import { TotalCatchupSchema } from '../../../types/model.interface.js';
import { getCurrentEventsSeries } from '../../../types/types.interface.js';

/**
 * Получение данных по Эвентам Серии за выбранный сезон
 * @param type - тип Эвента typeRaceCustom
 * @param seriesData - данные по Серии заездов (дата старта, окончания)
 */
export const getCurrentEvents = async (type: string, seriesData: TotalCatchupSchema) => {
  const zwiftEventsDB: getCurrentEventsSeries[] = await ZwiftEvent.find(
    { typeRaceCustom: type },
    { _id: true, totalFinishedCount: true, eventStart: true }
  ).lean();

  const zwiftEvents = zwiftEventsDB.filter((event) => {
    const isAfterStart = new Date(event.eventStart).getTime() >= seriesData.start;
    const isBeforeEnd = new Date(event.eventStart).getTime() < seriesData.end;
    return isAfterStart && isBeforeEnd;
  });

  return zwiftEvents;
};
