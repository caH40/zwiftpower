import { NSeriesModel } from '../../Model/NSeries.js';
import { ZwiftEvent } from '../../Model/ZwiftEvent.js';
import { getResultsFromZwift } from '../updates/results_event/resultsFromZwift.js';
import { getCPFromResult } from '../power/empty-cp.js';
import { MongooseUtils } from '../../utils/MongooseUtils.js';

// types
import {
  TSeries,
  TStageResult,
  ZwiftEventSubgroupSchema,
} from '../../types/model.interface.js';
import {
  TCategorySeries,
  TGetProtocolsStageFromZwiftParams,
  TSetCategoriesStageParams,
} from '../../types/types.interface.js';
import { StageResultModel } from '../../Model/StageResult.js';
import { handleAndLogError } from '../../errors/error.js';

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
  }: TGetProtocolsStageFromZwiftParams): Promise<TStageResult[]> {
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

    // Получение финишных протокола(протоколов) этапа серии с ZwiftAPI.
    const requestResults = await getResultsFromZwift(eventsWithSubgroups, null);

    // Формирования необходимой структуры результатов Этапа для Серии заездов.
    const stageResults = requestResults.map((result) => {
      const cpBestEfforts = getCPFromResult(result);
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
        cpBestEfforts,
        rank: 0, // Инициализация, установка корректного места в протоколе на следующих этапах.
        activityData,
        category: null,
        points: null,
        disqualification: null,
        penalty: null,
        teamSquadAtRace: null,
      } as TStageResult;
    });

    return stageResults;
  }

  /**
   * Установка категорий райдерам в финишном протоколе этапа серии заездов.
   */
  protected async setCategories({
    stageResults,
    stageOrder,
  }: TSetCategoriesStageParams): Promise<TStageResult[]> {
    // FIXME: в дальнейшем продумать более детально логику определения категорий, например на основе диапазонов категорий принятых в текущей серии заездов.

    const seriesDB = await this.getSeriesData();

    // Проверка, если этапы перед текущим stageOrder, то есть является ли stageOrder самым первым в серии заездов (нулевым или первым).
    // FIXME: Присваивать категорию на основе той группы в которой выступал райдер.
    // FIXME: Или указывать, что категория не определена. Выбор данных настроек можно вынести в определенный параметр Серии заездов.
    if (stageOrder === Math.min(...seriesDB.stages.map(({ order }) => order))) {
      return stageResults.map((stage) => {
        stage.category = stage.activityData.subgroupLabel;
        return stage;
      });
    }

    // Если этап не первый в серии:
    // Получить данные по категориям райдеров из прошлого заезда и присвоить соответствующую категорию в данном этапе.

    // Результаты прошлого этапа.
    const previousStagesResults = await StageResultModel.find(
      {
        seriesId: this.seriesId,
        order: stageOrder - 1,
      },
      { _id: false, profileId: true, category: true }
    ).lean<{ profileId: number; category: TCategorySeries | null }[]>();

    // Создание коллекции Map для боле быстрого доступа к данным.
    const previousStagesResultsMap = new Map(
      previousStagesResults.map((res) => [res.profileId, res.category])
    );

    return stageResults.map((stage) => {
      // Если райдер profileId не участвовал в предыдущем заезде, то категория берется на основании группы в которой участвовал райдер.
      stage.category =
        previousStagesResultsMap.get(stage.profileId) || stage.activityData.subgroupLabel;
      return stage;
    });
  }

  /**
   * Сортировка результатов и установка ранкинга в результатах для каждой категории.
   */
  protected setCategoryRanks(stageResults: TStageResult[]): TStageResult[] {
    if (!stageResults.length) return [];

    const resultsSorted = stageResults.toSorted(
      (a, b) => a.activityData.durationInMilliseconds - b.activityData.durationInMilliseconds
    );

    const categories: Record<TCategorySeries, number> = {
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
    };

    return resultsSorted.map((result) => {
      // Если у райдера, показавшему результат, нет категории или результат был дисквалифицирован.
      if (!result.category || result.disqualification?.status) {
        result.rank = 0;
        return result;
      }

      result.rank = categories[result.category] ?? 0;
      categories[result.category]++;
      return result;
    });
  }

  /**
   * Удаление всех старых результатов текущего этапа серии.
   */
  protected async deleteOutdatedStageResults(stageOrder: number): Promise<void> {
    try {
      const res = await StageResultModel.deleteMany({
        series: this.seriesId,
        order: stageOrder,
      });

      console.log(
        `Удалено ${res.deletedCount} результатов Серии _id:${this.seriesId}, Этапа: №${stageOrder}`
      );
    } catch (error) {
      handleAndLogError(error);
    }
  }
}
