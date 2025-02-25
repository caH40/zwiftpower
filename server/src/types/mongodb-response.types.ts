/**
 *
 */

import { Types } from 'mongoose';
import { TFileMetadataForCloud, TSeries, ZwiftEventSubgroupSchema } from './model.interface';

export type NextWeekRacesResponseDB = {
  _id: Types.ObjectId;
  id: number;
  eventType: string;
  eventStart: string;
  microserviceExternalResourceId: string;
  microserviceEventVisibility: string;
  organizerId: { name: string };
  eventSubgroups: {
    mapId: number;
    routeId: number;
    distanceSummary: { distanceInKilometers: number; elevationGainInMeters: number };
    distanceInMeters: number;
    durationInSeconds: number;
    laps: number;
  }[];
};

/**
 * Данные по Эвентам организатора для добавления/удаления в Серию.
 */
export type TEventsForSeriesResponseDB = {
  _id: Types.ObjectId;
  name: string;
  eventStart: string;
};

/**
 * Данные по Сериям для организатора.
 */
export type TOrganizerSeriesAllResponseDB = Pick<
  TSeries,
  | '_id'
  | 'dateEnd'
  | 'dateStart'
  | 'isFinished'
  | 'logoFileInfo'
  | 'name'
  | 'posterFileInfo'
  | 'urlSlug'
  | 'type'
> & { stages: TStage[] };

// Этап полученный при использовании populate.
type TStage = {
  event: {
    _id: Types.ObjectId;
    eventStart: string;
    name: string;
  };
  order: number;
};

/**
 * Данные Серии заездов для Организатора для редактирования.
 */
export type TOrganizerSeriesOneResponseDB = Omit<TSeries, 'stages'> & {
  stages: TStage[];
};

/**
 * Данные по Сериям для пользователей.
 */
export type TSeriesAllPublicResponseDB = Omit<TSeries, 'stages' | 'organizer'> & {
  organizer: { _id: Types.ObjectId; name: string; shortName: string };
  stages: {
    event: {
      _id: Types.ObjectId;
      id: number;
      eventStart: string;
      name: string;
    };
    order: number;
  }[];
};

/**
 * Данные по Серии для пользователей.
 */
export type TSeriesOnePublicResponseDB = Omit<TSeries, 'stages' | 'organizer'> & {
  organizer: {
    _id: Types.ObjectId;
    name: string;
    shortName: string;
    logoFileInfo: TFileMetadataForCloud;
  };
  stages: {
    event: {
      _id: Types.ObjectId;
      id: number;
      eventStart: string;
      name: string;
      eventSubgroups: ZwiftEventSubgroupSchema[];
    };
    order: number;
  }[];
};
