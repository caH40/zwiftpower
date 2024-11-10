import { Types } from 'mongoose';
import { eventDataFromZwiftAPI } from './zwiftAPI/eventsDataFromZwift.interface.js';
import { TAccessExpressionObj } from './model.interface.js';

// данные из query параметров url
export interface GetLogsAdmins {
  page?: number; // номер страницы при пагинации
  docsOnPage?: number; // количество документов на одной странице при пагинации
  search?: string; // фильтр поиска
}
//
// данные из query параметров url
export interface GetEvents {
  started?: string; // был старт или нет 'false' | 'true'
  target?: string; // 'preview' выбор заездов, стартующих сегодня и завтра
  page?: number;
  docsOnPage?: number;
  search?: string;
}
//
// данные из body
export interface PostDevelopment {
  releaseDate: number;
  text: string;
  version: string;
  isFromGitHubActions?: boolean;
}
/**
 * данные получаемые с фронтэнда для создания нового Event
 */
export interface PostEvent extends eventDataFromZwiftAPI {
  creator: string;
  organizer: string;
  typeRaceCustom: string;
  accessExpressionObj: TAccessExpressionObj;
  seriesId: Types.ObjectId | null;
}
/**
 * данные получаемые с фронтэнда для изменения данных Event
 */
export interface PutEvent {
  eventTemplateId: number;
  eventData: PostEvent;
}
/**
 * данные получаемые с фронтэнда для создания нового Event в Zwift
 */
export interface PostZwiftEvent {
  eventTemplateId: number;
  eventData: eventDataFromZwiftAPI;
}

/**
 * данные получаемые с фронтэнда для изменения результата Райдера в Эвенте
 */
export interface PutResult {
  property: string;
  data: { value: string; message: string };
  id: string;
}

/**
 * Данные из query параметров url
 */
export interface GetRidersQuery {
  page?: string; // номер страницы при пагинации
  docsOnPage?: string; // количество документов на одной странице при пагинации
  search?: string; // фильтр поиска
  columnName?: string; // Столбец по которому производится сортировка.
  isRasing?: string; // Направление сортировки.
  category?: 'All' | 'A' | 'B' | 'C' | 'D' | 'E'; // Категория запроса.
  male?: 'true' | 'false'; // Пол райдеров.
}

/**
 * Ответ с сервиса.
 */
export type TResponseService<T> = {
  data: T;
  message: string;
};

/**
 * Ответ с API Twitch streams
 */
export type TTwitchStreamsFromAPI = {
  data: TTwitchStreamsFromAPIData[];
  pagination: { cursor: 'string' } | object;
};

export type TTwitchStreamsFromAPIData = {
  id: string;
  user_id: string;
  user_login: string;
  user_name: string;
  game_id: string;
  game_name: string;
  type: string;
  title: string;
  tags: string[];
  viewer_count: number;
  started_at: Date;
  language: string;
  thumbnail_url: string;
  tag_ids: unknown[];
  is_mature: boolean;
};

/**
 * Ответ с API Twitch user.
 */
export type TTwitchUserFromAPI = {
  data: TTwitchUserFromAPIData[];
};

export type TTwitchUserFromAPIData = {
  id: string;
  login: string;
  display_name: string;
  type: string;
  broadcaster_type: string;
  description: string;
  profile_image_url: string;
  offline_image_url: string;
  view_count: number;
  created_at: Date;
};
