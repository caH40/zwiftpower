import { eventsForMailingPreviewDto } from '../../../dto/eventsList.dto.js';
import { ZwiftEvent } from '../../../Model/ZwiftEvent.js';
import { TEventForMailingPreviewDto } from '../../../types/dto.interface.js';
import { TEventForMailingPreviewDB } from '../../../types/mongodb-response.types.js';
import { setStartOfDay, setEndOfDay, getTimerLocal } from '../../../utils/date-local.js';

export async function getEventsForMailingPreviewService({
  startDate,
  endDate,
}: {
  startDate: string;
  endDate: string;
}): Promise<{ data: TEventForMailingPreviewDto[]; message: string }> {
  const currentStartDate = setStartOfDay(new Date(startDate)).toISOString();
  const currentEndDate = setEndOfDay(new Date(endDate)).toISOString();

  const eventsDB = await ZwiftEvent.find(
    {
      eventStart: { $gte: currentStartDate, $lte: currentEndDate },
    },
    {
      id: true,
      eventStart: true,
      imageUrl: true,
      name: true,
      microserviceExternalResourceId: true,
    }
  )
    .populate({ path: 'eventSubgroups', select: ['mapId', 'routeId', 'subgroupLabel', '-_id'] })
    .populate({ path: 'seriesId', select: ['posterFileInfo', 'name', 'urlSlug'] })
    .populate({ path: 'organizerId', select: ['logoFileInfo', 'urlSlug', 'name'] })
    .lean<TEventForMailingPreviewDB[]>();

  const eventsAfterDto = eventsDB.map((e) => eventsForMailingPreviewDto(e));

  // Сортировка по возрастанию по дате старта.
  eventsAfterDto.sort(
    (a, b) => new Date(a.eventStart).getTime() - new Date(b.eventStart).getTime()
  );

  return {
    data: eventsAfterDto,
    message: `Эвенты с ${getTimerLocal(startDate, 'DDMMYY')} по ${getTimerLocal(
      endDate,
      'DDMMYY'
    )} для рассылки на email пользователей.`,
  };
}
