import { Types } from 'mongoose';
import { NSeriesModel } from '../Model/NSeries.js';

// types
import { TSeries } from '../types/model.interface.js';
import {
  TSeriesAllPublicResponseDB,
  TSeriesOnePublicResponseDB,
  TStagesPublicResponseDB,
} from '../types/mongodb-response.types.js';

export class SeriesRepository {
  /**
   * Для TourGCManager.update.
   * По seriesId получение данных name,stages.
   */
  getStageIds = async (seriesId: string) => {
    return NSeriesModel.findOne({ _id: seriesId }, { _id: 0, name: 1, stages: 1 }).lean<
      Pick<TSeries, 'name' | 'stages'>
    >();
  };

  getById = async (seriesId: string) => {
    return NSeriesModel.findById(seriesId).lean<TSeries>();
  };

  updateResultModificationDate = async (seriesId: string): Promise<void> => {
    NSeriesModel.findOneAndUpdate(
      { _id: seriesId },
      { $set: { gcResultsUpdatedAt: new Date() } }
    );
  };

  getResultsUpdateDate = async (
    urlSlug: string
  ): Promise<Pick<TSeries, '_id' | 'name' | 'gcResultsUpdatedAt' | 'type'> | null> => {
    return NSeriesModel.findOne(
      { urlSlug },
      { _id: 1, name: 1, gcResultsUpdatedAt: 1, type: 1 }
    ).lean();
  };

  getWithStageForGC = async (urlSlug: string): Promise<TStagesPublicResponseDB | null> => {
    return NSeriesModel.findOne({ urlSlug })
      .populate({
        path: 'stages.event',
        select: [
          'name',
          'id',
          'eventStart',
          'imageUrl',
          'typeRaceCustom',
          'eventType',
          'rulesSet',
          'tags',
          'started',
          'cullingType',
          'categoryEnforcement',
        ],
        populate: {
          path: 'eventSubgroups',
          select: [
            'id',
            'mapId',
            'routeId',
            'durationInSeconds',
            'distanceInMeters',
            'laps',
            'distanceSummary',
            'eventSubgroupStart',
            'subgroupLabel',
            'tags',
            'totalEntrantCount',
          ],
        },
      })
      .populate({ path: 'organizer', select: ['logoFileInfo', '-_id'] })
      .lean<TStagesPublicResponseDB>();
  };

  getForPublicGC = async (urlSlug: string): Promise<TSeriesOnePublicResponseDB | null> => {
    return NSeriesModel.findOne({ urlSlug })
      .populate({ path: 'organizer', select: ['logoFileInfo', '_id', 'name', 'shortName'] })
      .populate({
        path: 'stages.event',
        select: ['id', 'name', 'eventStart'],
      })
      .lean<TSeriesOnePublicResponseDB>();
  };

  getAllForPublicGC = async (searchQuery: {
    organizer?: { _id: Types.ObjectId };
  }): Promise<TSeriesAllPublicResponseDB[]> => {
    return NSeriesModel.find(searchQuery)
      .populate({ path: 'organizer', select: ['name', 'shortName'] })
      .populate({ path: 'stages.event', select: ['name', 'id', 'eventStart'] })
      .lean<TSeriesAllPublicResponseDB[]>();
  };
}
