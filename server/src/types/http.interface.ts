import { Types } from 'mongoose';
import { eventDataFromZwiftAPI } from './zwiftAPI/eventsDataFromZwift.interface.js';
import { TAccessExpressionObj, TSeries, TSocialLinks, TTelegram } from './model.interface.js';

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
  organizerId?: string;
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
  id: string; // ObjectId документа результата.
  property: 'disqualification'; // Какое свойство изменяется.
  value: string; // Значение property.
  message: string; // Описание устанавливаемого значения.
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
  started_at: string;
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

export type TZwiftJwtToken = {
  header: {
    alg: 'RS256'; // Алгоритм
    typ: 'JWT'; // Тип токена
    kid: string; // Идентификатор ключа
  };
  payload: {
    exp: number; // Время истечения токена (Unix timestamp)
    iat: number; // Время выпуска токена (Unix timestamp)
    jti: string; // Уникальный идентификатор токена
    iss: string; // Издатель токена
    aud: string[]; // Целевые аудитории
    sub: string; // Уникальный идентификатор субъекта
    typ: 'Bearer'; // Тип токена
    azp: string; // Авторизованная сторона
    session_state: string; // Состояние сессии
    acr: string; // Уровень аутентификации
    realm_access: { roles: string[] }; // Роли в рамках области
    resource_access: {
      [key: string]: { roles: string[] }; // Доступ к ресурсам и их роли
    };
    scope: string; // Область токена
    sid: string; // Идентификатор сессии
    name: string; // Полное имя пользователя
    preferred_username: string; // Предпочитаемое имя пользователя
    given_name: string; // Имя пользователя
    family_name: string; // Фамилия пользователя
    email: string; // Электронная почта
  };
  signature: string; // Подпись токена
};

/**
 * Ответ на получение данных об токинах через sdk.
 */
export type VkAuthResponse = {
  refresh_token: string;
  access_token: string;
  id_token: string; // JSON Web Token пользователя.
  token_type: string; // Тип токена — по умолчанию Bearer.
  expires_in: number; // Срок действия токена в миллисекундах.
  user_id: number; // Идентификатор пользователя.
  state: string; // Строка состояния в виде случайного набора символов.
  scope: string; // Список прав доступа.
};

/**
 * Ответ на запрос данных об пользователе /user_info.
 */
export type VkUserInfoResponse = {
  user_id: number; // Идентификатор пользователя.
  first_name: string; // Имя пользователя.
  last_name: string; // Фамилия пользователя.
  avatar: string; // Ссылка на аватар пользователя.
  email?: string; // Электронная почта (опционально, если предоставлена).
  sex: 0 | 1 | 2; // Пол: 0 - не указан, 1 - женский, 2 - мужской.
  verified: boolean; // Статус подтверждения аккаунта.
  birthday?: string; // Дата рождения в формате 'DD.MM.YYYY' (опционально).
};

/**
 * данные получаемые с фронтэнда для обновления данных Организатора.
 */
export interface TPutOrganizerMain {
  organizerId: string;
  isPublished: boolean;
  name: string;
  shortName: string;
  logoFile?: Express.Multer.File;
  posterFile?: Express.Multer.File;
  mission?: string;
  description?: string;
  clubMain?: string;
  telegram?: TTelegram;
  website?: string;
  country?: string;
  socialLinks?: TSocialLinks;
}

/**
 *
 */
export type TQueryParamsNotifications = {
  text?: string;
  notificationsTypes?: string; // или string[], если ожидается массив
  subject?: string;
  title?: string;
};

/**
 * Данные после десериализации для создания Серии, которые пришли с клиента в формате FormData.
 */
export type SeriesDataFromClientForCreate = Omit<
  TSeries,
  '_id' | 'urlSlug' | 'scoringAlgorithms' | 'logoFileInfo' | 'scoringAlgorithms' | 'stages'
> & { scoringAlgorithmsId: string; stages: { event: string; order: number }[] };

/**
 * Данные после десериализации для создания Серии, которые пришли с клиента в формате FormData.
 */
export type SeriesDataFromClientForCreateFull = SeriesDataFromClientForCreate & {
  organizerId: Types.ObjectId;
  logoFile?: Express.Multer.File;
  posterFile?: Express.Multer.File;
};
