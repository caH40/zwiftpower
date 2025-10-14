import { Types } from 'mongoose';
import { ZwiftEvent } from '../Model/ZwiftEvent.js';

export class EventRepository {
  /**
   * Все Эвенты в которых есть подгруппы subgroupsId
   */
  async getEventIds(
    subgroupsIds: Types.ObjectId[]
  ): Promise<{ _id: Types.ObjectId; eventStart: string }[]> {
    return await ZwiftEvent.find(
      {
        eventSubgroups: { $in: subgroupsIds },
      },
      { _id: 1, eventStart: 1, id: 1 }
    ).lean<{ _id: Types.ObjectId; eventStart: string }[]>();
  }
}
