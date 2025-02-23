// types
import { TOrganizer } from './model.interface';
import { TEventsForSeriesResponseDB } from './mongodb-response.types';
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
