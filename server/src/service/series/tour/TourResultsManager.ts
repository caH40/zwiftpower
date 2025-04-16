import { NSeriesModel } from '../../../Model/NSeries.js';
import { StageResultModel } from '../../../Model/StageResult.js';
import { TResponseService } from '../../../types/http.interface.js';
import { TStageResult } from '../../../types/model.interface.js';
import { TCategorySeries } from '../../../types/types.interface.js';
import { addAgeAndFlagNew } from '../../protocol/age-and-flag.js';
import { HandlerSeries } from '../HandlerSeries.js';

/**
 * Класс работы с результатами Тура TSeriesType = 'tour'
 */
export class TourResultsManager extends HandlerSeries {
  constructor(public seriesId: string) {
    super(seriesId); // Вызов конструктора базового класса.
  }

  /**
   * Создание финишного протокола Этапа тура на основе данных протокола с ZwiftAPI.
   *
   * @param {number} stageOrder - Номер этапа (order) в серии заездов.
   */
  public async buildStageProtocol(stageOrder: number): Promise<TResponseService<null>> {
    const { stages: stagesFromSeries } = await this.getSeriesData();

    // Создание массива заездов, если в этапе несколько заездов.
    const stages = stagesFromSeries
      .filter((stage) => stage.order === stageOrder)
      .map((stage) => stage.event);

    if (stages.length === 0) {
      throw new Error(`Этап с порядковым номером ${stageOrder} не найден в серии.`);
    }

    // Получение финишных протоколов заездов Этапа серии из ZwiftAPI.
    const { stageResults: protocolsStageFromZwift, subgroupIdsInEvents } =
      await this.getProtocolsStageFromZwift({
        stages,
        stageOrder,
      });

    // Добавление флага и возраста из регистрационных данных райдеров в результаты этапа соответствующих райдеров. (Эти данные отсутствуют в финишном протоколе ZwiftAPI).
    const resultsWithAgeAndFlag = await addAgeAndFlagNew(
      subgroupIdsInEvents,
      protocolsStageFromZwift
    );

    // Установка категорий райдерам.
    const resultsWithCategories = await this.setCategories({
      stageResults: resultsWithAgeAndFlag,
      stageOrder,
    });

    // Сортировка результатов и проставления ранкинга в каждой категории.
    const resultsWithRank = this.setCategoryRanks(resultsWithCategories);

    // Установка финишных гэпов (разрывов между участниками).
    this.setGaps(resultsWithRank);

    // Удаление всех старых результатов текущего этапа серии.
    await this.deleteOutdatedStageResults(stageOrder);

    // Сохранение результатов в БД.
    await StageResultModel.create(resultsWithRank);

    // Изменение флага hasResults в данных этапа серии если имеется хоть один результат этапа.
    await NSeriesModel.findOneAndUpdate(
      { _id: this.seriesId, 'stages.order': stageOrder },
      {
        $set: {
          'stages.$.hasResults': resultsWithRank.length > 0,
        },
      },
      { new: true }
    );

    return { data: null, message: `Созданы результаты этапа №${stageOrder}` };
  }

  /**
   * Рассчитывает и устанавливает временные гэпы между райдерами для различных категорий.
   *
   * @param results Массив отсортированных по времени результатов заезда.
   */
  setGaps = (results: TStageResult[]) => {
    const categoriesInResults = new Set<TCategorySeries | 'absolute'>(['absolute']);

    // Коллекция всех категорий которые есть в результатах.
    for (const result of results) {
      if (result.category) {
        categoriesInResults.add(result.category);
      }
    }

    // Инициализация пустого объекта для счетчиков.
    const indexesInCategories: Partial<
      Record<TCategorySeries | 'absolute', { leader: number | null; prev: number }>
    > = {};

    // Инициализация счетчиков лидеров и предыдущих участников для всех категорий.
    // leader - индекс лидера в соответствующей категории или абсолюте.
    // prev - индекс предыдущего результата в соответствующей категории или абсолюте.
    for (const key of categoriesInResults) {
      indexesInCategories[key] = { leader: null, prev: 0 };
    }

    // Итерация по всем результатам с расчетом соответствующих гэпов.
    for (let resultIndex = 0; resultIndex < results.length; resultIndex++) {
      const result = results[resultIndex];
      const categoryInResult = result.category;

      // Инициализация полей gapsInCategories.
      result.gapsInCategories = {
        absolute: null,
        category: null,
      };

      // 1. Расчет гэпов для категорий.
      if (categoryInResult) {
        // Данные, какие индексы в текущей категории (categoryInResult) у лидера и предыдущего участника.
        const categoryEntry = indexesInCategories[categoryInResult];

        // Явная проверка, что categoryEntry не undefined или null.
        if (categoryEntry) {
          const indexLeaderCategory = categoryEntry.leader;

          // Если indexLeaderCategory === null, значит этот результат является лидеров в текущей категории (categoryInResult).
          if (indexLeaderCategory === null) {
            categoryEntry.leader = resultIndex;
            categoryEntry.prev = resultIndex;
          } else {
            result.gapsInCategories.category = this.calculateGaps(
              results,
              resultIndex,
              indexLeaderCategory,
              categoryEntry.prev
            );
            categoryEntry.prev = resultIndex;
          }
        }
      }

      // 2. Расчет гэпов для абсолютного зачета.
      if (indexesInCategories['absolute']) {
        if (resultIndex === 0) {
          indexesInCategories['absolute'].leader = 0;
        } else {
          result.gapsInCategories.absolute = this.calculateGaps(
            results,
            resultIndex,
            0,
            resultIndex - 1
          );
        }
      }
    }
  };

  /**
   * Рассчитывает временные гэпы.
   *
   * @param index Индекс текущего райдера.
   * @param leaderIndex Индекс лидера в категории.
   * @param prevIndex Индекс предыдущего райдера в категории.
   * @returns Объект с гэпами к лидеру и предыдущему райдеру.
   */
  calculateGaps = (
    results: TStageResult[],
    index: number,
    leaderIndex: number,
    prevIndex: number
  ) => {
    const toLeader =
      results[index].activityData.durationInMilliseconds -
      results[leaderIndex].activityData.durationInMilliseconds;
    const toPrev =
      results[index].activityData.durationInMilliseconds -
      results[prevIndex].activityData.durationInMilliseconds;

    return { toLeader, toPrev };
  };
}
