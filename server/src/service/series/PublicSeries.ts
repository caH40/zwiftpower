import { Types } from 'mongoose';

import { NSeriesModel } from '../../Model/NSeries.js';
import { seriesAllPublicDto, seriesOnePublicDto, stagesPublicDto } from '../../dto/series.js';
import { getResultsSeriesCatchup } from './catchup/index.js';
import { TourResults } from './tour/TourResults.js';
import { Organizer } from '../../Model/Organizer.js';
import { SeriesClassificationModel } from '../../Model/SeriesClassification.js';
import { generalClassificationDto } from '../../dto/resultsSeries.dto.js';
import { getOrThrow } from '../../utils/getOrThrow.js';
import { SeriesRepository } from '../../repositories/Series.js';

// types
import {
  TStagesPublicResponseDB,
  TGeneralClassificationDB,
} from '../../types/mongodb-response.types.js';
import {
  TGeneralClassificationDto,
  TGroupedSeriesForClient,
  TSeriesAllPublicDto,
  TSeriesOnePublicDto,
  TStagesPublicDto,
} from '../../types/dto.interface.js';
import { TResponseService } from '../../types/http.interface.js';
import { TSeries } from '../../types/model.interface.js';
import {
  TPublicSeriesServiceFilterStagesParams,
  TPublicSeriesServiceGetStagesParams,
  TPublicSeriesServiceSortStagesParams,
} from '../../types/types.interface.js';

/**
 * Класс работы с Сериями заездов по запросам пользователей сайта.
 */
export class PublicSeriesService {
  private seriesRepository: SeriesRepository = new SeriesRepository();
  constructor() {}

  /**
   * Сервис получение всех Серий заездов.
   */
  public async getAll(
    organizerSlug?: string
  ): Promise<TResponseService<TGroupedSeriesForClient>> {
    // Получение _id организатора если есть запрос по organizerSlug, для последующего поиска Series
    const organizer = organizerSlug
      ? await Organizer.findOne({ urlSlug: organizerSlug }, { _id: true }).lean<{
          _id: Types.ObjectId;
        }>()
      : null;

    // Формирование строки поиска.
    const searchQuery = { ...(organizer && { organizer }) };

    // Получение всех Серий заезда, или только Серий заездов организатора, если есть organizerSlug.
    const seriesDB = await this.seriesRepository.getAllForPublicGC(searchQuery);

    const seriesAfterDto = seriesAllPublicDto(seriesDB);

    // Группировка карточек по статусам и сортировка внутри каждой группы.
    const groupedSeries = this.groupByStatus(seriesAfterDto);

    return { data: groupedSeries, message: 'Серии заездов.' };
  }

  /**
   * Сервис получение данных Серий заездов по urlSlug.
   * FIXME: Может добавить options для сужения запроса,
   */
  public async get(urlSlug: string): Promise<TResponseService<TSeriesOnePublicDto>> {
    const seriesOneDB = await getOrThrow(
      this.seriesRepository.getForPublicGC(urlSlug),
      `Не найдена Серия заездов с urlSlug: "${urlSlug}"`
    );

    // Фильтрация от этапов у которых нет id Эвента.
    const stagesFilteredAndSorted = seriesOneDB.stages
      .filter((stage) => stage.event)
      .sort((a, b) => a.order - b.order);

    seriesOneDB.stages = stagesFilteredAndSorted;

    // Добавление итоговых таблиц результатов для разных типов серий.
    let seriesResults = {};
    switch (seriesOneDB.type) {
      case 'catchUp':
        seriesResults = await getResultsSeriesCatchup(seriesOneDB._id);
        break;

      case 'series':
        seriesResults = { message: 'В разработке...' };
        break;

      case 'tour': {
        seriesResults = {
          message: 'Генеральная классификация отправляется отдельным запросом.',
        };
        break;
      }

      case 'endurance': {
        seriesResults = {
          message: 'Генеральная классификация отправляется отдельным запросом.',
        };
        break;
      }

      case 'criterium':
        seriesResults = { message: 'В разработке...' };
        break;

      default:
        throw new Error(`Не опознан тип seriesType: ${seriesOneDB.type}`);
    }

    const seriesAfterDto = seriesOnePublicDto(seriesOneDB, seriesResults);

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

      case 'endurance':
        seriesResults = { message: 'В разработке...' };
        break;

      case 'tour': {
        const tourResults = new TourResults(String(seriesOneDB._id));
        seriesResults = await tourResults.getStageResults(stageOrder);
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
   * Получение всех итоговых таблиц.
   */
  public getGeneralClassification = async (
    urlSlug: string
  ): Promise<TResponseService<TGeneralClassificationDto>> => {
    // Данные по Серии заездов.
    const seriesOneDB = await getOrThrow(
      this.seriesRepository.getResultsUpdateDate(urlSlug),
      `Не найдена Серия заездов с urlSlug: "${urlSlug}"`
    );

    // Получение генеральной классификации серии заездов.
    const generalClassification = await SeriesClassificationModel.find({
      seriesId: seriesOneDB._id,
    }).lean<TGeneralClassificationDB[]>();

    const gcResultsUpdatedAt = seriesOneDB.gcResultsUpdatedAt;

    // Сортирует классификацию: сначала не дисквалифицированные по времени, затем дисквалифицированные.
    const sortedGC = this.sortClassifications(generalClassification);

    return {
      data: generalClassificationDto(sortedGC, gcResultsUpdatedAt),
      message: `Генеральная классификация серии "${seriesOneDB.name}"`,
    };
  };

  /**
   * Получение данных по этапам серии заездов.
   */
  getStages = async ({
    urlSlug,
    status,
  }: TPublicSeriesServiceGetStagesParams): Promise<TResponseService<TStagesPublicDto[]>> => {
    const seriesOneDB = await getOrThrow(
      this.seriesRepository.getWithStageForGC(urlSlug),
      `Не найдена Серия заездов с urlSlug: "${urlSlug}"`
    );

    // Фильтрация этапов в зависимости от статуса с последующей сортировкой по дате старта.
    const filteredStages = this.filterStages({ stages: seriesOneDB.stages, status });

    const stagesAfterDto = stagesPublicDto(filteredStages, seriesOneDB.organizer.logoFileInfo);
    // Сортировка этапов по дате старта в зависимости от status.
    const sortedStages = this.sortStages({ stages: stagesAfterDto, status });
    // console.log(sortedStages);
    return { data: sortedStages, message: 'Данные по этапам серии заездов.' };
  };

  /**
   * Фильтрация этапов в зависимости от статуса.
   */
  private filterStages({
    stages,
    status,
  }: TPublicSeriesServiceFilterStagesParams): TStagesPublicResponseDB['stages'] {
    switch (status) {
      case 'finished':
        return stages.filter((s) => s.event?.started === true);
      case 'upcoming':
        return stages.filter((s) => s.event?.started === false);
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
  }: TPublicSeriesServiceSortStagesParams): TStagesPublicDto[] {
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

    // Сортируем группу по дате начала.
    grouped.upcoming.sort(
      (a, b) => new Date(a.dateStart).getTime() - new Date(b.dateStart).getTime()
    );
    // Сортируем группу по дате начала.
    grouped.ongoing.sort(
      (a, b) => new Date(a.dateStart).getTime() - new Date(b.dateStart).getTime()
    );
    // Завершенные серии сортируем по дате завершения.
    grouped.completed.sort(
      (a, b) => new Date(b.dateEnd).getTime() - new Date(a.dateEnd).getTime()
    );

    return grouped;
  }

  /**
   * Сортирует классификацию: сначала не дисквалифицированные по времени, затем дисквалифицированные.
   */
  private sortClassifications = (
    classifications: TGeneralClassificationDB[]
  ): TGeneralClassificationDB[] => {
    const { valid, dsq } = classifications.reduce<{
      valid: TGeneralClassificationDB[];
      dsq: TGeneralClassificationDB[];
    }>(
      (acc, cur) => {
        // Сортировка этапов внутри результата по возрастанию номера этапа в серии заездов.
        cur.stages.sort((a, b) => a.stageOrder - b.stageOrder);

        if (cur.disqualification?.status) {
          acc.dsq.push(cur);
        } else {
          acc.valid.push(cur);
        }
        return acc;
      },
      { valid: [], dsq: [] }
    );

    valid.sort((a, b) => a.totalTimeInMilliseconds - b.totalTimeInMilliseconds);

    return [...valid, ...dsq];
  };
}
