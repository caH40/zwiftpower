import { TOrganizerSeriesAllDto } from '../types/dto.interface.js';
import { TOrganizerSeriesAllResponseDB } from '../types/mongodb-response.types.js';
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

    // Создание ссылки для всех доступных размеров файла на основе предоставленных метаданных.
    const logoUrls = createUrlsToFileCloud(elm.logoFileInfo);
    const posterUrls = createUrlsToFileCloud(elm.posterFileInfo);

    return { ...elm, _id, dateStart, dateEnd, logoUrls, posterUrls };
  });
}
