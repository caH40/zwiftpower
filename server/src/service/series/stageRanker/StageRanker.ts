import { SERIES_TYPES } from '../../../assets/constants.js';
import { EnduranceStageRanking } from './EnduranceRanking.js';
import { TourStageRanking } from './TourRanking.js';

// types
import { TSeriesType, TStageResult } from '../../../types/model.interface.js';

type THandler = (stageResults: TStageResult[]) => Promise<TStageResult[]>;

/**
 * Установка ранкинга в протоколе этапа.
 */
export class StageRanker {
  private readonly handlers: Map<TSeriesType, THandler>;
  private tourRanking = new TourStageRanking();
  private enduranceRanking = new EnduranceStageRanking();

  constructor() {
    this.handlers = new Map<TSeriesType, THandler>([
      ['endurance', this.enduranceRanking.set],
      ['tour', this.tourRanking.set],
      ['series', this.tourRanking.set],
      ['catchUp', this.tourRanking.set],
      ['criterium', this.tourRanking.set],
    ]);
  }

  public calculateRanking = async (
    stageResults: TStageResult[],
    seriesType: TSeriesType
  ): Promise<TStageResult[]> => {
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
}
