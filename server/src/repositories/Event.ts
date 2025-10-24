import { Types } from 'mongoose';
import { ZwiftEvent } from '../Model/ZwiftEvent.js';

/**
 * Класс работы с коллекцией ZwiftEvent в MongoDB.
 */
export class EventRepository {
  /**
   * Все Эвенты в которых есть подгруппы subgroupsId
   * @param subgroupsIds - массив _id подгрупп эвента из БД.
   */
  async getEventIds(subgroupsIds: Types.ObjectId[]): Promise<GetEventIdsReturn> {
    return await ZwiftEvent.find(
      {
        eventSubgroups: { $in: subgroupsIds },
      },
      { _id: 1, eventStart: 1, id: 1 }
    ).lean();
  }
}

export type GetEventIdsReturn = { _id: Types.ObjectId; eventStart: string; id: number }[];
