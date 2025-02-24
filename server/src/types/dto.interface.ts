// types
import { TOrganizer, TSeries } from './model.interface';
import {
  TEventsForSeriesResponseDB,
  TOrganizerSeriesAllResponseDB,
} from './mongodb-response.types';
import { EventWithSubgroup } from './types.interface';

/**
 * Данные Организатора основные и модерируемые клубы для клиента.
 */
export type TOrganizerMainDto = {
  organizer: Omit<
    TOrganizer,
    | '_id'
    | 'createdAt'
    | 'updatedAt'
    | 'botZwift'
    | 'creator'
    | 'logoFileInfo '
    | 'posterFileInfo'
  > & {
    organizerId: string;
    logoUrls: Record<string, string> | undefined;
    posterUrls: Record<string, string> | undefined;
  };
  clubs: { name: string; id: string }[];
};

/**
 * Данные Эвента с подгруппами для расписания для клиента.
 */
export type TEventWithSubgroupDto = Omit<EventWithSubgroup, 'organizerId'> & {
  organizerId?: string;
  logoFileInfo?: Record<string, string>;
  [key: string]: unknown;
};

/**
 * DTO данных по Эвентам организатора для добавления/удаления в Серию.
 */
export type TEventsForSeriesDto = Omit<TEventsForSeriesResponseDB, '_id'> & { _id: string };

/**
 * DTO данных по Сериям для организатора.
 */
export type TOrganizerSeriesAllDto = Omit<
  TOrganizerSeriesAllResponseDB,
  '_id' | 'dateStart' | 'dateEnd' | 'logoUrls' | 'posterUrls' | 'stages'
> & {
  _id: string;
  stages: TStageClient[];
  dateStart: string;
  dateEnd: string;
  logoUrls: Record<string, string> | undefined;
  posterUrls: Record<string, string> | undefined;
};

// Данные Этапа для клиента.
type TStageClient = {
  _id: string;
  eventStart: string;
  name: string;
  order: number;
};

/**
 * DTO данных по Сериям для организатора.
 */
export type TOrganizerSeriesOneDto = Omit<
  TSeries,
  '_id' | 'dateStart' | 'dateEnd' | 'logoUrls' | 'posterUrls' | 'stages'
> & {
  _id: string;
  stages: TStageClient[];
  dateStart: string;
  dateEnd: string;
  logoUrls: Record<string, string> | undefined;
  posterUrls: Record<string, string> | undefined;
};
