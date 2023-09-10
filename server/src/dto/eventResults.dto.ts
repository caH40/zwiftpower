// types
import { EventResultsDtoArg } from '../types/types.interface.js';
import { EventResultsFetch } from '../common/types/eventResults.interface.js';

export const eventResultsDto = ({ event, message }: EventResultsDtoArg) => {
  const eventParams: EventResultsFetch = { ...event };
  return { event: eventParams, message };
};
