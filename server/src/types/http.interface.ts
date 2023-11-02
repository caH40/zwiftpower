import { eventDataFromZwiftAPI } from './zwiftAPI/eventsDataFromZwift.interface.js';

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
  seriesId?: string;
}
/**
 * данные получаемые с фронтэнда для изменения данных Event
 */
export interface PutEvent {
  eventTemplateId: number;
  eventData: PostEvent;
}

/**
 * данные получаемые с фронтэнда для изменения результата Райдера в Эвенте
 */
export interface PutResult {
  property: string;
  data: { value: string; message: string };
  id: string;
}
