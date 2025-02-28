import { NSeriesModel } from '../../Model/NSeries.js';
import { seriesAllPublicDto, seriesOnePublicDto } from '../../dto/series.js';

// types
import {
  TSeriesOnePublicResponseDB,
  TSeriesAllPublicResponseDB,
} from '../../types/mongodb-response.types.js';
import { TSeriesAllPublicDto, TSeriesOnePublicDto } from '../../types/dto.interface.js';
import { TResponseService } from '../../types/http.interface.js';

/**
 * Класс работы с Сериями заездов по запросам пользователей сайта.
 */
export class SeriesPublicService {
  constructor() {}

  /**
   * Сервис получение всех Серий заездов.
   */
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

  /**
   * Сервис получение данных запрашиваемой Серий заездов.
   */
  public async get(urlSlug: string): Promise<TResponseService<TSeriesOnePublicDto>> {
    const seriesOneDB = await NSeriesModel.findOne({ urlSlug })
      .populate({ path: 'organizer', select: ['logoFileInfo', '_id', 'name', 'shortName'] })
      .populate({
        path: 'stages.event',
        select: [
          'name',
          'id',
          'eventStart',
          'imageUrl',
          'typeRaceCustom',
          'eventType',
          'rulesSet',
          'tags',
          'started',
        ],
        populate: 'eventSubgroups',
      })
      .lean<TSeriesOnePublicResponseDB>();

    if (!seriesOneDB) {
      throw new Error(`Не найдена Серия заездов с urlSlug: "${urlSlug}"`);
    }
    const stagesFilteredAndSorted = seriesOneDB.stages
      .filter((stage) => stage.event && !stage.event.started)
      .sort(
        (a, b) =>
          new Date(a.event.eventStart).getTime() - new Date(b.event.eventStart).getTime()
      );

    seriesOneDB.stages = stagesFilteredAndSorted;

    const seriesAfterDto = seriesOnePublicDto(seriesOneDB);

    // Сортировка Этапов, сначала более новые Серии.
    seriesAfterDto.stages.sort(
      (a, b) => new Date(a.eventStart).getTime() - new Date(b.eventStart).getTime()
    );

    return { data: seriesAfterDto, message: 'Запрашиваемая Серия заездов.' };
  }
}
