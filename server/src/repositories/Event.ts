import { Types } from 'mongoose';
import { ZwiftEvent } from '../Model/ZwiftEvent.js';
import { TSeries } from '../types/model.interface.js';
import { TImportanceCoefficientsLevels } from '../types/points.types.js';

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

  /**
   * Запрос основных данных подгрупп эвента.
   */
  async getSubgroupsMainInfo(eventId: string): Promise<{
    eventSubgroups:
      | {
          _id: Types.ObjectId;
          id: number;
          subgroupLabel: string;
        }[];
  } | null> {
    return ZwiftEvent.findOne({ _id: eventId }, { _id: false, eventSubgroups: true })
      .populate<{
        eventSubgroups: {
          _id: Types.ObjectId;
          id: number;
          subgroupLabel: string;
        }[];
      }>({ path: 'eventSubgroups', select: ['id', 'subgroupLabel'] })
      .lean();
  }

  /**
   * Запрос данных серии по типу формирования результатов заездов.
   */
  async getSeriesInfo(eventId: string) {
    return ZwiftEvent.findOne({ _id: eventId }, { seriesId: 1, importanceLevel: 1 })
      .populate<{
        seriesId: TSeries | null;
      }>({ path: 'seriesId' })
      .lean<{
        seriesId: TSeries | null;
        _id: Types.ObjectId;
        importanceLevel?: TImportanceCoefficientsLevels;
      }>();
  }
}

export type GetEventIdsReturn = { _id: Types.ObjectId; eventStart: string; id: number }[];
