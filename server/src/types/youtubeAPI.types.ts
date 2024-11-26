/**
 * Тип для описания миниатюр канала в разных размерах.
 */
type TThumbnail = {
  url: string; // URL изображения
  width: number; // Ширина изображения
  height: number; // Высота изображения
};

/**
 * Тип для данных канала YouTube (заголовок, описание, ссылки на изображения и страна).
 */
type TSnippet = {
  title: string; // Название канала
  description: string; // Описание канала
  customUrl: string; // Пользовательская ссылка на канал
  publishedAt: string; // Дата публикации канала
  thumbnails: {
    // Миниатюры канала в разных размерах
    default: TThumbnail;
    medium: TThumbnail;
    high: TThumbnail;
  };
  localized: {
    // Локализованное название и описание канала
    title: string;
    description: string;
  };
  country: string; // Страна канала
};

/**
 * Тип для статистики канала YouTube (просмотры, подписчики, видео).
 */
type TStatistics = {
  viewCount: string; // Количество просмотров
  subscriberCount: string; // Количество подписчиков
  hiddenSubscriberCount: boolean; // Скрыта ли информация о количестве подписчиков
  videoCount: string; // Количество видео на канале
};

/**
 * Тип для элемента канала YouTube (содержит id, snippet и статистику).
 */
export type TChannelItem = {
  kind: string; // Тип элемента (например, youtube#channel)
  etag: string; // Уникальный идентификатор элемента
  id: string; // Идентификатор канала
  snippet: TSnippet; // Данные канала (заголовок, описание, изображения и т.д.)
  statistics: TStatistics; // Статистика канала (просмотры, подписчики, видео и т.д.)
  brandingSettings: TChannelBrandingSettings; // Баннер канала.
};

type TChannelBrandingSettings = {
  channel: {
    title: string; // Название канала
    description: string; // Описание канала
    keywords: string; // Ключевые слова
    unsubscribedTrailer?: string; // ID видео для незарегистрированных пользователей
    country?: string; // Страна
  };
  image?: {
    bannerExternalUrl?: string; // URL баннера канала
  };
};

/**
 * Тип для ответа от YouTube API, содержащий данные о канале.
 */
export type TYoutubeChannelListResponse = {
  kind: string; // Тип ответа (например, youtube#channelListResponse)
  etag: string; // Уникальный идентификатор ответа
  pageInfo: {
    // Информация о странице (количество результатов)
    totalResults: number; // Общее количество результатов
    resultsPerPage: number; // Количество результатов на странице
  };
  items?: TChannelItem[]; // Массив каналов (один или несколько)
};

// Тип для объекта "id"
type TSearchResultId = {
  kind: string; // Тип результата (например, youtube#video)
  videoId?: string; // ID видео, если это видео
  channelId?: string; // ID канала, если это канал
  playlistId?: string; // ID плейлиста, если это плейлист
};

// Тип для объекта "snippet"
type TSearchResultSnippet = {
  publishedAt: string; // Дата публикации
  channelId: string; // ID канала
  title: string; // Название видео
  description: string; // Описание видео
  thumbnails: {
    default: TThumbnail; // Миниатюра стандартного размера
    medium: TThumbnail; // Миниатюра среднего размера
    high: TThumbnail; // Миниатюра высокого качества
  };
  channelTitle: string; // Название канала
  liveBroadcastContent: string; // Тип контента (live, none и т.д.)
  publishTime: string; // Время публикации
};

// Тип для отдельного результата поиска
type TSearchResultItem = {
  kind: string; // Тип результата (youtube#searchResult)
  etag: string; // Уникальный идентификатор для данного результата
  id: TSearchResultId; // Идентификатор результата (видео, канал или плейлист)
  snippet: TSearchResultSnippet; // Сведения о результате
};

// Тип для объекта "pageInfo"
type TPageInfo = {
  totalResults: number; // Общее количество результатов
  resultsPerPage: number; // Количество результатов на странице
};

// Основной тип для ответа API "Search List"
export type TYoutubeSearchListResponse = {
  kind: string; // Тип ресурса (youtube#searchListResponse)
  etag: string; // Уникальный идентификатор для всего ответа
  regionCode: string; // Региональный код ответа (например, NL)
  pageInfo: TPageInfo; // Информация о пагинации
  items: TSearchResultItem[]; // Массив результатов поиска
};

/**
 * Тип для ответа API "Video List".
 */
export type TYoutubeVideoListResponse = {
  kind: string; // Тип ресурса (youtube#videoListResponse)
  etag: string; // Уникальный идентификатор ответа
  items: TVideoItem[]; // Массив видео
  pageInfo: TPageInfo; // Информация о пагинации
};
/**
 * Тип для элемента видео в списке.
 */
export type TVideoItem = {
  kind: string; // Тип элемента (youtube#video)
  etag: string; // Уникальный идентификатор элемента
  id: string; // ID видео
  snippet: TVideoSnippet; // Сведения о видео
  liveStreamingDetails?: TLiveStreamingDetails; // Детали прямой трансляции (если применимо)
};
/**
 * Тип для деталей прямой трансляции.
 */
type TLiveStreamingDetails = {
  actualStartTime?: string; // Реальное время начала трансляции
  scheduledStartTime: string; // Запланированное время начала трансляции
  concurrentViewers?: string; // Количество зрителей онлайн
  activeLiveChatId?: string; // ID активного чата
};

/**
 * Тип для объекта "snippet" видео.
 */
type TVideoSnippet = {
  publishedAt: string; // Дата публикации
  channelId: string; // ID канала
  title: string; // Название видео
  description: string; // Описание видео
  thumbnails: TThumbnails; // Миниатюры видео
  channelTitle: string; // Название канала
  tags?: string[]; // Теги видео
  categoryId: string; // Категория видео
  liveBroadcastContent: string; // Тип контента (live, none и т.д.)
  localized: TLocalized; // Локализованные данные
  defaultAudioLanguage?: string; // Язык аудио по умолчанию
};
/**
 * Тип для локализованного названия и описания видео.
 */
type TLocalized = {
  title: string; // Локализованное название
  description: string; // Локализованное описание
};
/**
 * Тип для объекта миниатюр видео.
 */
type TThumbnails = {
  default: TThumbnail; // Миниатюра стандартного размера
  medium: TThumbnail; // Миниатюра среднего размера
  high: TThumbnail; // Миниатюра высокого качества
  standard?: TThumbnail; // Стандартная миниатюра
  maxres?: TThumbnail; // Миниатюра максимального разрешения
};
