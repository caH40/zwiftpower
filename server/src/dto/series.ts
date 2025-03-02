import {
  TOrganizerSeriesAllDto,
  TOrganizerSeriesOneDto,
  TSeriesAllPublicDto,
  TSeriesOnePublicDto,
} from '../types/dto.interface.js';
import {
  TOrganizerSeriesAllResponseDB,
  TOrganizerSeriesOneResponseDB,
  TSeriesOnePublicResponseDB,
  TSeriesAllPublicResponseDB,
} from '../types/mongodb-response.types.js';
import { createUrlsToFileCloud } from '../utils/url.js';

/**
 * DTO получения всех серий организатора для клиента.
 */
export function organizerSeriesAllDto(
  series: TOrganizerSeriesAllResponseDB[]
): TOrganizerSeriesAllDto[] {
  return series.map((elm) => {
    const _id = String(elm._id);
    const dateStart = elm.dateStart.toISOString();
    const dateEnd = elm.dateEnd.toISOString();

    const stages = elm.stages.map((stage) => ({
      eventStart: stage.event.eventStart,
      _id: String(stage.event._id),
      name: stage.event.name,
      order: stage.order,
    }));

    // Создание ссылки для всех доступных размеров файла на основе предоставленных метаданных.
    const logoUrls = createUrlsToFileCloud(elm.logoFileInfo);
    const posterUrls = createUrlsToFileCloud(elm.posterFileInfo);

    return { ...elm, stages, _id, dateStart, dateEnd, logoUrls, posterUrls };
  });
}

/**
 * DTO получения серии заездов для редактирования организатором.
 */
export function organizerSeriesOneDto(
  series: TOrganizerSeriesOneResponseDB
): TOrganizerSeriesOneDto {
  const _id = String(series._id);
  const dateStart = series.dateStart.toISOString().split('T')[0];
  const dateEnd = series.dateEnd.toISOString().split('T')[0];

  const stages = series.stages
    .filter((elm) => elm.event)
    .map((stage) => ({
      eventStart: stage.event.eventStart,
      _id: String(stage.event._id),
      name: stage.event.name,
      order: stage.order,
    }));
  const description = series.description;

  // Создание ссылки для всех доступных размеров файла на основе предоставленных метаданных.
  const logoUrls = createUrlsToFileCloud(series.logoFileInfo);
  const posterUrls = createUrlsToFileCloud(series.posterFileInfo);

  return { ...series, description, _id, dateStart, dateEnd, stages, logoUrls, posterUrls };
}

/**
 * DTO получения всех серий для пользователей сайта.
 */
export function seriesAllPublicDto(
  series: TSeriesAllPublicResponseDB[]
): TSeriesAllPublicDto[] {
  return series.map((elm) => {
    const _id = String(elm._id);
    const dateStart = elm.dateStart.toISOString();
    const dateEnd = elm.dateEnd.toISOString();

    const stages = elm.stages
      .filter((elm) => elm.event)
      .map((stage) => ({
        eventStart: stage.event.eventStart,
        id: stage.event.id,
        _id: String(stage.event._id),
        name: stage.event.name,
        order: stage.order,
      }));

    // Создание ссылки для всех доступных размеров файла на основе предоставленных метаданных.
    const logoUrls = createUrlsToFileCloud(elm.logoFileInfo);
    const posterUrls = createUrlsToFileCloud(elm.posterFileInfo);

    return { ...elm, stages, _id, dateStart, dateEnd, logoUrls, posterUrls };
  });
}

/**
 * DTO получения данных запрашиваемой Серии для публичного доступа пользователей сайта.
 */
export function seriesOnePublicDto(
  series: TSeriesOnePublicResponseDB,
  seriesResults: unknown
): TSeriesOnePublicDto {
  const _id = String(series._id);

  // Лого Организатора заездов.
  const logoFileInfoOrganizer = createUrlsToFileCloud(series.organizer.logoFileInfo);

  const organizer = {
    _id: String(series.organizer._id),
    name: series.organizer.name,
    shortName: series.organizer.shortName,
    logoFileInfo: logoFileInfoOrganizer,
  };

  const stages = series.stages.map((stage) => ({
    eventStart: stage.event.eventStart,
    id: stage.event.id,
    _id: String(stage.event._id),
    name: stage.event.name,
    imageUrl: stage.event.imageUrl,
    typeRaceCustom: stage.event.typeRaceCustom,
    eventType: stage.event.eventType,
    rulesSet: stage.event.rulesSet,
    started: stage.event.started,
    tags: stage.event.tags,
    logoFileInfo: logoFileInfoOrganizer,
    order: stage.order,

    eventSubgroups: stage.event.eventSubgroups, // FIXME: по подгруппам нет выборки только нужных данных!
  }));

  const dateStart = series.dateStart.toISOString();
  const dateEnd = series.dateEnd.toISOString();

  // Создание ссылки для всех доступных размеров файла на основе предоставленных метаданных.
  const logoUrls = createUrlsToFileCloud(series.logoFileInfo);
  const posterUrls = createUrlsToFileCloud(series.posterFileInfo);

  return {
    ...series,
    organizer,
    stages,
    _id,
    dateStart,
    dateEnd,
    logoUrls,
    posterUrls,
    seriesResults,
  };
}
