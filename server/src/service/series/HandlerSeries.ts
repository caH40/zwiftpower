import { Types } from 'mongoose';

import { getResultsFromZwift } from '../updates/results_event/resultsFromZwift.js';
import { getCPFromResult } from '../power/empty-cp.js';
import { MongooseUtils } from '../../utils/MongooseUtils.js';
import { StageResultModel } from '../../Model/StageResult.js';
import { handleAndLogError } from '../../errors/error.js';
import { SeriesRepository } from '../../repositories/Series.js';
import { EventRepository } from '../../repositories/Event.js';

// types
import { TStageResult } from '../../types/model.interface.js';
import {
  TRaceSeriesCategories,
  TGetProtocolsStageFromZwiftParams,
} from '../../types/types.interface.js';

export class HandlerSeries {
  mongooseUtils: MongooseUtils = new MongooseUtils();
  private seriesRepository: SeriesRepository = new SeriesRepository();
  private eventRepository: EventRepository = new EventRepository();

  constructor(public seriesId: string) {}

  /**
   * Получение и создание базовых финишных протоколов заездов Этапа серии из ZwiftAPI.
   */
  protected async createProtocolsStageFromZwift({
    stages,
    stageOrder,
  }: TGetProtocolsStageFromZwiftParams): Promise<{
    stageResults: TStageResult[];
    subgroupIdsInEvents: Types.ObjectId[];
  }> {
    // Получение данных всех подгрупп для последующего запроса результатов райдеров в подгруппах.
    const eventSubgroups = await this.getEventSubgroups(stages);

    // _id всех подгрупп этапов в БД.
    const subgroupIdsInEvents = eventSubgroups
      .map((subgroup) => subgroup._id)
      .filter((_id): _id is Types.ObjectId => _id !== undefined);

    // Получение финишных протокола(протоколов) этапа серии с ZwiftAPI.
    const requestResults = await getResultsFromZwift(eventSubgroups, null);

    // Формирования необходимой структуры результатов Этапа для Серии заездов.
    const stageResults = requestResults.map((result) => {
      // Формирование объекта Critical Power для разных интервалов.
      const cpBestEfforts = getCPFromResult(result, true);

      const activityData = {
        durationInMilliseconds: result.activityData.durationInMilliseconds,
        subgroupLabel: result.subgroupLabel,
        segmentDistanceInCentimeters: result.activityData.segmentDistanceInCentimeters,
        segmentDistanceInMeters: result.activityData.segmentDistanceInMeters,
        elevationInMeters: result.activityData.elevationInMeters,
        calories: result.activityData.calories,
        endDate: result.activityData.endDate,
      };

      // Инициализация, а установка расчетных данных на следующих этапах.
      return {
        series: this.mongooseUtils.convertToObjectId(this.seriesId),
        order: stageOrder,
        profileId: result.profileId,
        eventId: result.eventId,
        profileData: result.profileData,
        sensorData: result.sensorData,
        cpBestEfforts,
        rank: {
          category: 0,
          absolute: 0,
        },
        activityData,
        category: null,
        categoryInRace: null,
        points: null,
        disqualification: null,
        penalty: null,
        teamSquadAtRace: null,
      } as TStageResult;
    });

    return { stageResults, subgroupIdsInEvents };
  }

  /**
   * Сортировка результатов и установка ранкинга в результатах этапа для каждой категории.
   */
  protected setCategoryRanks(stageResults: TStageResult[]): TStageResult[] {
    if (!stageResults.length) {
      return [];
    }

    const resultsSorted = stageResults.toSorted(
      (a, b) => a.activityData.durationInMilliseconds - b.activityData.durationInMilliseconds
    );

    const categories: Record<TRaceSeriesCategories | 'absolute', number> = {
      APlus: 1,
      A: 1,
      BPlus: 1,
      B: 1,
      CPlus: 1,
      C: 1,
      D: 1,
      E: 1,
      WA: 1,
      WB: 1,
      WC: 1,
      WD: 1,
      absolute: 1,
    };

    return resultsSorted.map((result) => {
      const currentCategory = result.modifiedCategory?.value ?? result.category;
      // Если у райдера, показавшему результат, нет категории или результат был дисквалифицирован.
      if (!currentCategory || result.disqualification?.status) {
        result.rank.category = 0;
        return result;
      }

      // Присвоение финишного места в категории и увеличение соответствующего счетчика.
      result.rank.category = categories[currentCategory] ?? 0;
      categories[currentCategory]++;

      // Присвоение финишного места в абсолюте и увеличение соответствующего счетчика.
      result.rank.absolute = categories['absolute'] ?? 0;
      categories['absolute']++;
      return result;
    });
  }

  /**
   * Удаление всех старых результатов текущего этапа серии.
   */
  public async deleteOutdatedStageResults(stageOrder: number): Promise<void> {
    try {
      await StageResultModel.deleteMany({
        series: this.seriesId,
        order: stageOrder,
      });
    } catch (error) {
      handleAndLogError(error);
    }
  }

  /**
   * Изменение дисквалификации у участника в результате заезда на этапа.
   */
  public async modifyDisqualification(): Promise<void> {}

  /**
   * Изменение категории у участника в результате заезда на этапа.
   */
  public async modifyPenalty(): Promise<void> {}

  /**
   * Получает данные серии из базы данных.
   */
  protected async getSeriesData() {
    const seriesDB = await this.seriesRepository.getById(this.seriesId);

    if (!seriesDB) {
      throw new Error(`Серия с _id: ${this.seriesId} не найдена в базе данных.`);
    }

    return seriesDB;
  }

  /**
   * Основные данные подгрупп этапов (если в этапе серии несколько эвентов, то запрашиваются
   * все подгруппы данных эвентов)
   */
  private getEventSubgroups = async (
    stages: Types.ObjectId[]
  ): Promise<
    {
      _id: Types.ObjectId;
      id: number;
      subgroupLabel: string;
    }[]
  > => {
    // Запрос данных подгрупп заездов в этапе для последующего получения результатов подгрупп и объединения их в результаты заездов.
    const requestEventsWithSubgroups = stages.map((eventId) =>
      this.eventRepository.getSubgroupsMainInfo(eventId._id.toString())
    );

    // Получение данных всех подгрупп для последующего запроса результатов райдеров в подгруппах.
    const eventsWithSubgroups = (await Promise.all(requestEventsWithSubgroups)).flatMap(
      (event) => {
        if (!event) {
          throw new Error('Не найден ZwiftEvent из обновляемого Этапа!');
        }
        return event.eventSubgroups;
      }
    );

    return eventsWithSubgroups;
  };
}
