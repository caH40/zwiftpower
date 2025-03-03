import { NSeriesModel } from '../../Model/NSeries.js';
import { seriesAllPublicDto, seriesOnePublicDto } from '../../dto/series.js';

// types
import {
  TSeriesOnePublicResponseDB,
  TSeriesAllPublicResponseDB,
} from '../../types/mongodb-response.types.js';
import { TSeriesAllPublicDto, TSeriesOnePublicDto } from '../../types/dto.interface.js';
import { TResponseService } from '../../types/http.interface.js';
import { getResultsSeriesCatchup } from './catchup/index.js';
import { Organizer } from '../../Model/Organizer.js';

/**
 * Класс работы с Сериями заездов по запросам пользователей сайта.
 */
export class SeriesPublicService {
  constructor() {}

  /**
   * Сервис получение всех Серий заездов.
   */
  public async getAll(
    organizerSlug?: string
  ): Promise<TResponseService<TSeriesAllPublicDto[]>> {
    // Получение _id организатора если есть запрос по organizerSlug, для последующего поиска Series
    const organizer = organizerSlug
      ? await Organizer.findOne({ urlSlug: organizerSlug }, { _id: true }).lean()
      : null;

    // Формирование строки поиска.
    const searchQuery = { ...(organizer && { organizer }) };

    // Получение всех Серий заезда, или только Серий заездов организатора, если есть organizerSlug.
    const seriesDB = await NSeriesModel.find(searchQuery)
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

    let seriesResults = {};

    switch (seriesOneDB.type) {
      case 'catchUp':
        seriesResults = await getResultsSeriesCatchup(seriesOneDB._id);
        break;

      case 'series':
        seriesResults = { message: 'В разработке...' };
        break;

      case 'tour':
        seriesResults = { message: 'В разработке...' };
        break;

      case 'criterium':
        seriesResults = { message: 'В разработке...' };
        break;

      default:
        throw new Error(`Не опознан тип seriesType: ${seriesOneDB.type}`);
    }

    const seriesAfterDto = seriesOnePublicDto(seriesOneDB, seriesResults);

    // Сортировка Этапов, сначала более новые Серии.
    seriesAfterDto.stages.sort(
      (a, b) => new Date(a.eventStart).getTime() - new Date(b.eventStart).getTime()
    );

    return { data: seriesAfterDto, message: 'Запрашиваемая Серия заездов.' };
  }
}
