import { NSeriesModel } from '../../Model/NSeries.js';
import { seriesAllPublicDto, seriesOnePublicDto, stagesPublicDto } from '../../dto/series.js';
import { TourResultsManager } from './tour/TourResultsManager.js';
import { getResultsSeriesCatchup } from './catchup/index.js';

// types
import {
  TSeriesOnePublicResponseDB,
  TSeriesAllPublicResponseDB,
  TStagesPublicResponseDB,
} from '../../types/mongodb-response.types.js';
import {
  TGroupedSeriesForClient,
  TSeriesAllPublicDto,
  TSeriesOnePublicDto,
  TStagesPublicDto,
} from '../../types/dto.interface.js';
import { TResponseService } from '../../types/http.interface.js';
import { Organizer } from '../../Model/Organizer.js';
import { TSeries } from '../../types/model.interface.js';
import {
  TSeriesPublicServiceFilterStagesParams,
  TSeriesPublicServiceGetStagesParams,
  TSeriesPublicServiceSortStagesParams,
} from '../../types/types.interface.js';

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
  ): Promise<TResponseService<TGroupedSeriesForClient>> {
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

    // Группировка карточек по статусам и сортировка внутри каждой группы.
    const groupedSeries = this.groupByStatus(seriesAfterDto);

    return { data: groupedSeries, message: 'Серии заездов.' };
  }

  /**
   * Сервис получение данных Серий заездов по urlSlug.
   * FIXME: Может добавить options для сужения запроса,
   * FIXME: Передаются итоговые результаты серии, переместить в другой запрос?,
   * например получить только Регламент, Расписание и т.д...
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

    // Фильтрация от этапов у которых нет id Эвента.
    const stagesFilteredAndSorted = seriesOneDB.stages
      .filter((stage) => {
        // FIXME: Костыль для Догонялок, возвращаются только не начавшиеся этапы.
        if (seriesOneDB.type === 'catchUp') {
          return stage.event && stage.event.started === false;
        } else {
          return stage.event;
        }
      })
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

  /**
   * Сервис получение результатов серии в зависимости от её типа.
   */
  public async getStageResults({
    urlSlug,
    stageOrder,
  }: {
    urlSlug: string;
    stageOrder: number;
  }): Promise<TResponseService<unknown>> {
    const seriesOneDB = await NSeriesModel.findOne(
      { urlSlug, 'stages.order': stageOrder },
      { type: true }
    ).lean<Pick<TSeries, '_id' | 'type'>>();

    if (!seriesOneDB || !seriesOneDB._id) {
      throw new Error(
        `Не найдена Серия заездов с urlSlug: "${urlSlug}" и с order: "${stageOrder}"`
      );
    }

    let seriesResults = {} as unknown;

    switch (seriesOneDB.type) {
      case 'catchUp':
        seriesResults = { message: 'В разработке...' };
        break;

      case 'series':
        seriesResults = { message: 'В разработке...' };
        break;

      case 'tour': {
        const tourResultsManager = new TourResultsManager(String(seriesOneDB._id));

        seriesResults = await tourResultsManager.getStageResults(stageOrder);

        break;
      }

      case 'criterium':
        seriesResults = { message: 'В разработке...' };
        break;

      default:
        throw new Error(`Не опознан тип seriesType: ${seriesOneDB.type}`);
    }

    return {
      data: seriesResults,
      message: `Результаты этапа ${stageOrder} серии заездов ${urlSlug}`,
    };
  }

  /**
   * Получение данных по этапам серии заездов.
   */
  getStages = async ({
    urlSlug,
    status,
  }: TSeriesPublicServiceGetStagesParams): Promise<TResponseService<TStagesPublicDto[]>> => {
    const seriesOneDB = await NSeriesModel.findOne({ urlSlug })
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
      .populate({ path: 'organizer', select: ['logoFileInfo', '-_id'] })
      .lean<TStagesPublicResponseDB>();

    if (!seriesOneDB) {
      throw new Error(`Не найдена Серия заездов с urlSlug: "${urlSlug}"`);
    }

    // Фильтрация этапов в зависимости от статуса с последующей сортировкой по дате старта.
    const filteredStages = this.filterStages({ stages: seriesOneDB.stages, status });

    const stagesAfterDto = stagesPublicDto(filteredStages, seriesOneDB.organizer.logoFileInfo);

    // Сортировка этапов по дате старта в зависимости от status.
    const sortedStages = this.sortStages({ stages: stagesAfterDto, status });

    return { data: sortedStages, message: 'Данные по этапам серии заездов.' };
  };

  /**
   * Фильтрация этапов в зависимости от статуса.
   */
  private filterStages({
    stages,
    status,
  }: TSeriesPublicServiceFilterStagesParams): TStagesPublicResponseDB['stages'] {
    switch (status) {
      case 'finished':
        return stages.filter((s) => s.event?.started === false);
      case 'upcoming':
        return stages.filter((s) => s.event?.started === true);
      case 'all':
      default:
        return stages;
    }
  }

  /**
   * Сортировка этапов в зависимости от статуса.
   * Для status === 'finished' по убыванию даты старта.
   * Для status === 'upcoming' по возрастанию даты старта.
   * FIXME: Может делать сортировку по номеру этапа? (order).
   */
  private sortStages({
    stages,
    status,
  }: TSeriesPublicServiceSortStagesParams): TStagesPublicDto[] {
    switch (status) {
      case 'finished':
        return stages.sort(
          (a, b) => new Date(b.eventStart).getTime() - new Date(a.eventStart).getTime()
        );
      case 'upcoming':
        return stages.sort(
          (a, b) => new Date(a.eventStart).getTime() - new Date(b.eventStart).getTime()
        );
      case 'all':
      default:
        return stages.sort(
          (a, b) => new Date(a.eventStart).getTime() - new Date(b.eventStart).getTime()
        );
    }
  }

  /**
   * Группировка событий по их статусу и сортировка внутри каждой группы.
   * @param series - Все события.
   * @returns - Группировка по статусам.
   */
  private groupByStatus(series: TSeriesAllPublicDto[]) {
    const now = Date.now();

    // Объявляем тип для группировки
    const grouped: TGroupedSeriesForClient = {
      upcoming: [],
      ongoing: [],
      completed: [],
    };

    // Группируем и сразу сортируем в каждой группе.
    series.forEach((card) => {
      const startDate = new Date(card.dateStart).getTime();
      const endDate = new Date(card.dateEnd).getTime();

      if (now < startDate) {
        grouped.upcoming.push(card); // Событие еще не началось.
      } else if (now >= startDate && now <= endDate) {
        grouped.ongoing.push(card); // Событие проходит сейчас.
      } else {
        grouped.completed.push(card); // Событие завершилось.
      }
    });

    // Сортируем каждую группу по дате начала.
    grouped.upcoming.sort(
      (a, b) => new Date(a.dateStart).getTime() - new Date(b.dateStart).getTime()
    );
    grouped.ongoing.sort(
      (a, b) => new Date(a.dateStart).getTime() - new Date(b.dateStart).getTime()
    );
    grouped.completed.sort(
      (a, b) => new Date(a.dateStart).getTime() - new Date(b.dateStart).getTime()
    );

    return grouped;
  }
}
