import { EventResultsDtoArg, EventWithSubgroup } from '../types/types.interface.js';

export const eventResultsDto = ({ event, message }: EventResultsDtoArg) => {
  const eventParams: EventWithSubgroup = { ...event };
  return { event: eventParams, message };
};
