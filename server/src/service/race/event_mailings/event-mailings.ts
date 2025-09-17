import { eventsForMailingPreviewDto } from '../../../dto/eventsList.dto.js';
import { ZwiftEvent } from '../../../Model/ZwiftEvent.js';
import { TEventForMailingPreviewDto } from '../../../types/dto.interface.js';
import { TEventForMailingPreviewDB } from '../../../types/mongodb-response.types.js';
import { setStartOfDay, setEndOfDay, getTimerLocal } from '../../../utils/date-local.js';

export async function getEventsForMailingPreviewService({
  startDate,
  endDate,
  subject,
}: {
  startDate: string;
  endDate: string;
  subject: string;
}): Promise<{
  data: {
    events: TEventForMailingPreviewDto[];
    startDate: string;
    endDate: string;
    subject: string;
  };
  message: string;
}> {
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
    .populate({
      path: 'eventSubgroups',
      select: ['mapId', 'routeId', 'subgroupLabel', 'laps', '-_id', 'distanceSummary'],
    })
    .populate({ path: 'seriesId', select: ['posterFileInfo', 'name', 'urlSlug'] })
    .populate({ path: 'organizerId', select: ['logoFileInfo', 'urlSlug', 'name'] })
    .lean<TEventForMailingPreviewDB[]>();

  const eventsAfterDto = eventsDB.map((e) => eventsForMailingPreviewDto(e));
  // eventsAfterDto[0].eventSubgroups[0].
  // Сортировка по возрастанию по дате старта.
  eventsAfterDto.sort(
    (a, b) => new Date(a.eventStart).getTime() - new Date(b.eventStart).getTime()
  );

  return {
    data: { events: eventsAfterDto, startDate, endDate, subject },
    message: `Эвенты с ${getTimerLocal(startDate, 'DDMMYY')} по ${getTimerLocal(
      endDate,
      'DDMMYY'
    )} для рассылки на email пользователей.`,
  };
}
