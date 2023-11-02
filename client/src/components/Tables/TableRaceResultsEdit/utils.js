import { getTimerLocal } from '../../../utils/date-local';

export const getCaption = (event) => {
  if (!event) {
    return '';
  }
  const eventStart = getTimerLocal(event.eventStart, 'DDMMYYHm');
  const caption = `Результаты заезда  ${event.name}, ${eventStart}`;

  return caption;
};
