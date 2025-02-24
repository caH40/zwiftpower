import { TOrganizerSeriesAllDto, TOrganizerSeriesOneDto } from '../types/dto.interface.js';
import {
  TOrganizerSeriesAllResponseDB,
  TOrganizerSeriesOneResponseDB,
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

  const stages = series.stages.map((stage) => ({
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
