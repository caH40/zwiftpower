import { SERIES_TYPES } from '../../assets/constants.js';

// types
import { TSeriesType, TStageResult } from '../../types/model.interface.js';
import { TRaceSeriesCategories } from '../../types/types.interface.js';

type THandler = (stageResults: TStageResult[]) => TStageResult[];

/**
 * Установка ранкинга в протоколе этапа.
 */
export class StageRanker {
  private readonly handlers: Map<TSeriesType, THandler>;

  constructor() {
    this.handlers = new Map<TSeriesType, THandler>([
      ['endurance', this.setByDistance],
      ['tour', this.setByTime],
      ['series', this.setByTime],
      ['catchUp', this.setByTime],
      ['criterium', this.setByTime],
    ]);
  }

  public calculateRanking(
    stageResults: TStageResult[],
    seriesType: TSeriesType
  ): TStageResult[] {
    const handler = this.handlers.get(seriesType);

    if (!handler) {
      throw new Error(
        `Не найден обработчик расчета ранкинга в протоколе для типа серии: "${seriesType}". Тип должен соответствовать одному из: ${SERIES_TYPES.join(
          ', '
        )}`
      );
    }

    return handler(stageResults);
  }

  /**
   * Сортировка результатов и установка ранкинга в результатах этапа для каждой категории
   * по максимальной пройденной дистанции.
   */
  private setByDistance(stageResults: TStageResult[]): TStageResult[] {
    return stageResults;
  }

  /**
   * Сортировка результатов и установка ранкинга в результатах этапа для каждой категории
   * по наименьшему финишному времени.
   */
  private setByTime(stageResults: TStageResult[]): TStageResult[] {
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
}
