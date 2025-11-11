import { NSeriesModel } from '../../Model/NSeries.js';
import { stagesPublicDto } from '../../dto/series.js';
import { TourResults } from './tour/TourResults.js';
import { SeriesClassificationModel } from '../../Model/SeriesClassification.js';
import { generalClassificationDto } from '../../dto/resultsSeries.dto.js';
import { getOrThrow } from '../../utils/getOrThrow.js';
import { SeriesRepository } from '../../repositories/Series.js';

// types
import {
  TStagesPublicResponseDB,
  TGeneralClassificationDB,
} from '../../types/mongodb-response.types.js';
import { TGeneralClassificationDto, TStagesPublicDto } from '../../types/dto.interface.js';
import { TResponseService } from '../../types/http.interface.js';
import { TSeries } from '../../types/model.interface.js';
import {
  TPublicSeriesServiceFilterStagesParams,
  TPublicSeriesServiceGetStagesParams,
  TPublicSeriesServiceSortStagesParams,
} from '../../types/types.interface.js';

/**
 * Класс работы с данными для генеральной классификации серии заездов по запросам пользователей сайта.
 */
export class PublicSeriesGCService {
  private seriesRepository: SeriesRepository = new SeriesRepository();
  constructor() {}

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
