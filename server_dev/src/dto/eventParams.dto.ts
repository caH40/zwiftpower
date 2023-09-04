import { PostEvent } from '../types/http.interface.js';
import { EventWithSubgroup } from '../types/types.interface.js';

/**
 * @param event данные Event получаемые с фронтэнда для создания Event в БД
 */
export const eventParamsDto = (event: PostEvent) => {
  const eventParams: EventWithSubgroup = {
    ...event,
    seriesId: null,
    clubName: '',
    hasResults: false,
    needCount: true,
    updated: null,
    started: false,
    totalFinishedCount: 0,
    // eventSubgroups:event.eventSubgroups.map(subgroup => (...subgroup,))
  };

  return eventParams;
};
