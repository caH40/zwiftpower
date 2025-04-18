import { PostEvent } from '../types/http.interface.js';
import { EventWithSubgroup } from '../types/types.interface.js';

/**
 * DTO данных Event получаемые с фронтэнда для сохранения Event в БД
 */
export const eventParamsDto = (event: PostEvent) => {
  const eventParams: EventWithSubgroup = {
    ...event,
    clubName: '',
    hasResults: false,
    needCount: true,
    updated: undefined,
    started: false,
    totalFinishedCount: 0,
    seriesId: event.seriesId || null,
  };

  return eventParams;
};
