import { Types } from 'mongoose';

import { NSeriesModel } from '../../Model/NSeries.js';
import { ZwiftEvent } from '../../Model/ZwiftEvent.js';
import { getResultsFromZwift } from '../updates/results_event/resultsFromZwift.js';
import { getCPFromResult } from '../power/empty-cp.js';
import { MongooseUtils } from '../../utils/MongooseUtils.js';
import { StageResultModel } from '../../Model/StageResult.js';
import { handleAndLogError } from '../../errors/error.js';

// types
import {
  TSeries,
  TStageResult,
  ZwiftEventSubgroupSchema,
} from '../../types/model.interface.js';
import {
  TRaceSeriesCategories,
  TGetProtocolsStageFromZwiftParams,
} from '../../types/types.interface.js';

export class HandlerSeries {
  mongooseUtils: MongooseUtils = new MongooseUtils();

  constructor(public seriesId: string) {}

  /**
   * Получает данные серии из базы данных.
   */
  protected async getSeriesData() {
    const seriesDB = await NSeriesModel.findOne({ _id: this.seriesId }).lean<TSeries>();

    if (!seriesDB) {
      throw new Error(`Серия с _id: ${this.seriesId} не найдена в базе данных.`);
    }

    return seriesDB;
  }

  /**
   * Получение финишных протоколов заездов Этапа серии из ZwiftAPI и формирование структуры результатов для серии заездов.
   */
  protected async getProtocolsStageFromZwift({
    stages,
    stageOrder,
  }: TGetProtocolsStageFromZwiftParams): Promise<{
    stageResults: TStageResult[];
    subgroupIdsInEvents: Types.ObjectId[];
  }> {
    // Запрос данных подгрупп заездов в этапе для последующего получения результатов подгрупп и объединения их в результаты заездов.
    const requestEventsWithSubgroups = stages.map(
      (eventId) =>
        ZwiftEvent.findOne({ _id: eventId }, { _id: false })
          .populate({ path: 'eventSubgroups', select: ['id', 'subgroupLabel'] })
          .lean<{
            eventSubgroups: ZwiftEventSubgroupSchema[];
          }>()
      // FIXME: изменить в модуле getResultsFromZwift типизацию.
      // А во всех модулях, вызывающих getResultsFromZwift изменить передаваемый параметр
      // на { subgroupLabel: string; id: number; _id: Types.ObjectId }[]
      //
      // .lean<{
      //   eventSubgroups: { subgroupLabel: string; id: number; _id: Types.ObjectId }[];
      // }>()
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

    // _id всех подгрупп этапов в БД.
    const subgroupIdsInEvents = eventsWithSubgroups
      .map((subgroup) => subgroup._id)
      .filter((_id): _id is Types.ObjectId => _id !== undefined);

    // Получение финишных протокола(протоколов) этапа серии с ZwiftAPI.
    const requestResults = await getResultsFromZwift(eventsWithSubgroups, null);

    // Формирования необходимой структуры результатов Этапа для Серии заездов.
    const stageResults = requestResults.map((result) => {
      // Формирование объекта Critical Power для разных интервалов.
      const cpBestEfforts = getCPFromResult(result, true);

      const activityData = {
        durationInMilliseconds: result.activityData.durationInMilliseconds,
        subgroupLabel: result.subgroupLabel,
      };

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
        }, // Инициализация, установка корректного места в протоколе на следующих этапах.
        activityData,
        category: null,
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
  protected async deleteOutdatedStageResults(stageOrder: number): Promise<void> {
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
}
