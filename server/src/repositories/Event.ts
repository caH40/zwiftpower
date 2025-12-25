import { Types } from 'mongoose';
import { ZwiftEvent } from '../Model/ZwiftEvent.js';
import { TSeries, TSeriesStage } from '../types/model.interface.js';
import { TImportanceCoefficientsLevels } from '../types/points.types.js';
import { MongooseUtils } from '../utils/MongooseUtils.js';
import { EventWithSubgroupAndSeries, TZwiftCategory } from '../types/types.interface.js';

/**
 * Класс работы с коллекцией ZwiftEvent в MongoDB.
 */
export class EventRepository {
  mongooseUtils: MongooseUtils = new MongooseUtils();
  /**
   * Все Эвенты для таблиц расписания или результатов заездов
   */
  async getEventsForResultsAndSchedule(query: {
    organizerId?: string | undefined;
    started: boolean;
  }) {
    return ZwiftEvent.find(query)
      .populate('eventSubgroups')
      .populate({ path: 'seriesId', select: ['logoFileInfo', 'name', 'urlSlug'] })
      .populate({
        path: 'organizerId',
        select: ['logoFileInfo', '_id', 'name', 'shortName', 'urlSlug'],
      })
      .lean<EventWithSubgroupAndSeries[]>();
  }
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
          subgroupLabel: TZwiftCategory;
        }[];
  } | null> {
    return ZwiftEvent.findOne({ _id: eventId }, { _id: false, eventSubgroups: true })
      .populate<{
        eventSubgroups: {
          _id: Types.ObjectId;
          id: number;
          subgroupLabel: TZwiftCategory;
        }[];
      }>({ path: 'eventSubgroups', select: ['id', 'subgroupLabel'] })
      .lean();
  }

  /**
   * Запрос данных серии по типу формирования результатов заездов.
   */
  async getSeriesInfo(eventId: string) {
    return ZwiftEvent.findOne(
      { _id: eventId },
      { seriesId: 1, importanceLevel: 1, typeRaceCustom: 1 }
    )
      .populate<{
        seriesId: TSeries | null;
      }>({ path: 'seriesId' })
      .lean<{
        seriesId: TSeries | null;
        _id: Types.ObjectId;
        importanceLevel?: TImportanceCoefficientsLevels;
        typeRaceCustom: string;
      }>();
  }

  /**
   * Запрос на рейтинговые эвенты за определенный сезон. (!== unrated)
   * @param start Дата старта сезона (с какой даты получать эвенты).
   * @param end Дата финиша сезона (по какую дату получать эвенты).
   */
  async getRated(
    start: Date,
    end: Date
  ): Promise<{ _id: Types.ObjectId; id: number; seriesId?: { useStageResults?: boolean } }[]> {
    return ZwiftEvent.find(
      {
        eventStart: {
          $gte: this.mongooseUtils.toMongoEventString(start),
          $lt: this.mongooseUtils.toMongoEventString(end),
        },
        importanceLevel: { $ne: 'unrated' },
      },
      { _id: 1, seriesId: 1, id: 1 }
    )
      .populate<{ seriesId?: { useStageResults?: boolean } }>({
        path: 'seriesId',
        select: ['-_id', 'useStageResults'],
      })
      .lean();
  }

  async getRatedForTeam(eventIds: Types.ObjectId[]): Promise<
    {
      _id: Types.ObjectId;
      id: number;
      name: string;
      eventStart: string;
      typeRaceCustom: string;
      importanceLevel?: TImportanceCoefficientsLevels;
      seriesId?: {
        useStageResults?: boolean;
        stages: TSeriesStage[];
        name: string;
        urlSlug: string;
      };
    }[]
  > {
    return ZwiftEvent.find(
      {
        _id: { $in: eventIds },
        importanceLevel: { $ne: 'unrated' },
      },
      {
        _id: 1,
        seriesId: 1,
        id: 1,
        name: 1,
        eventStart: 1,
        importanceLevel: 1,
        typeRaceCustom: 1,
      }
    )
      .populate<{
        seriesId?: {
          useStageResults?: boolean;
          stages: TSeriesStage[];
          name: string;
          urlSlug: string;
        };
      }>({
        path: 'seriesId',
        select: ['-_id', 'useStageResults', 'name', 'urlSlug', 'stages'],
      })
      .lean();
  }
}

export type GetEventIdsReturn = { _id: Types.ObjectId; eventStart: string; id: number }[];
