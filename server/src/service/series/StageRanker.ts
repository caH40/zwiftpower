import { categoriesForRankings } from '../../assets/category.js';
import { SERIES_TYPES } from '../../assets/constants.js';

// types
import { TSeriesType, TStageResult } from '../../types/model.interface.js';

type THandler = (stageResults: TStageResult[]) => TStageResult[];

/**
 * Установка ранкинга в протоколе этапа.
 */
export class StageRanker {
  private readonly handlers: Map<TSeriesType, THandler>;

  constructor() {
    this.handlers = new Map<TSeriesType, THandler>([
      ['endurance', this.setByTimeWithLateJoin],
      ['tour', this.setByTime],
      ['series', this.setByTime],
      ['catchUp', this.setByTime],
      ['criterium', this.setByTime],
    ]);
  }

  public calculateRanking = (
    stageResults: TStageResult[],
    seriesType: TSeriesType
  ): TStageResult[] => {
    const handler = this.handlers.get(seriesType);

    if (!handler) {
      throw new Error(
        `Не найден обработчик расчета ранкинга в протоколе для типа серии: "${seriesType}". Тип должен соответствовать одному из: ${SERIES_TYPES.join(
          ', '
        )}`
      );
    }

    return handler(stageResults);
  };

  /**
   * Сортировка результатов и установка ранкинга в результатах этапа для каждой категории
   * с учетом полной дистанции.
   * FIXME: Необходима логика выявления участников заезда, которые ехали не из кармана,
   * а присоединились позже.
   */
  private setByTimeWithLateJoin = (stageResults: TStageResult[]): TStageResult[] => {
    if (!stageResults.length) {
      return [];
    }

    // Результаты в которых райдер проехал не полную дистанцию из-за позднего подключения
    // ставятся ниже тех, кто проехал полную.
    const sortedResults = stageResults.toSorted((a, b) => {
      return a.activityData.durationInMilliseconds - b.activityData.durationInMilliseconds;
    });

    return this.setRank(sortedResults);
  };

  /**
   * Сортировка результатов и установка ранкинга в результатах этапа для каждой категории
   * по наименьшему финишному времени.
   */
  private setByTime = (stageResults: TStageResult[]): TStageResult[] => {
    if (!stageResults.length) {
      return [];
    }

    const sortedResults = stageResults.toSorted((a, b) => {
      const aResult =
        a.durationInMillisecondsWithPenalties || a.activityData.durationInMilliseconds;
      const bResult =
        b.durationInMillisecondsWithPenalties || b.activityData.durationInMilliseconds;
      return aResult - bResult;
    });

    return this.setRank(sortedResults);
  };

  /**
   * Непосредственный расчет ранкинга и его установка результату.
   */
  private setRank = (results: TStageResult[]): TStageResult[] => {
    const categories = { ...categoriesForRankings };

    return results.map((result) => {
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
  };
}
