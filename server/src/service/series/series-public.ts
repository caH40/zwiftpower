import { NSeriesModel } from '../../Model/NSeries.js';
import { seriesAllPublicDto } from '../../dto/series.js';

// types
import { TSeriesAllPublicResponseDB } from '../../types/mongodb-response.types.js';
import { TSeriesAllPublicDto } from '../../types/dto.interface.js';
import { TResponseService } from '../../types/http.interface.js';

/**
 * Класс работы с Сериями заездов по запросам пользователей сайта.
 */
export class SeriesPublicService {
  constructor() {}

  // Получение всех Серий заездов.
  public async getAll(): Promise<TResponseService<TSeriesAllPublicDto[]>> {
    const seriesDB = await NSeriesModel.find()
      .populate({ path: 'organizer', select: ['name', 'shortName'] })
      .populate({ path: 'stages.event', select: ['name', 'id', 'eventStart'] })
      .lean<TSeriesAllPublicResponseDB[]>();

    const seriesAfterDto = seriesAllPublicDto(seriesDB);

    // Сортировка, сначала более новые Серии.
    seriesAfterDto.sort(
      (a, b) => new Date(b.dateStart).getTime() - new Date(a.dateStart).getTime()
    );

    return { data: seriesAfterDto, message: 'Серии заездов.' };
  }
}
