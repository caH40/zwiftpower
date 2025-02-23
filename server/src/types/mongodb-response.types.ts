/**
 *
 */

import { Types } from 'mongoose';
import { TSeries } from './model.interface';

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
>;
