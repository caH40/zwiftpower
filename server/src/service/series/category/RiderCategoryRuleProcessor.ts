import { Types } from 'mongoose';
import { StageResultModel } from '../../../Model/StageResult.js';

// types
import { TRiderCategoryRuleType } from '../../../types/series.types.js';
import { TRaceSeriesCategories } from '../../../types/types.interface.js';

type Params = {
  stageResultId: string;
  moderator?: string;
  value: TRaceSeriesCategories | null;
  reason?: string;
};

export class RiderCategoryRuleProcessor {
  private handlers: Map<TRiderCategoryRuleType, () => Promise<void>>;

  constructor(
    private readonly seriesId: string,
    private readonly dataForModifyCategory: Params
  ) {
    this.handlers = new Map();
    this.initHandlers();
  }

  /**
   * Запуск обработчика по типу правила.
   */
  public async execute(ruleType: TRiderCategoryRuleType): Promise<void> {
    const handler = this.handlers.get(ruleType);

    if (!handler) {
      throw new Error(`Нет обработчика для правила riderCategoryRule: "${ruleType}"`);
    }

    await handler();
  }

  /**
   * Инициализация обработчиков правил.
   */
  private initHandlers = (): void => {
    this.handlers.set('recalculationAll', this.handleRecalculationAll);
    this.handlers.set('stepChange', this.handleStepChange);
  };

  /**
   * Найти все результаты этапов данного райдера в текущей серии seriesId
   * Изменить во всех результатах категорию на новую
   * Пересчитать все финишные протоколы этапов из-за изменения категории у райдера
   * Пересчитать ГК.
   */
  private handleRecalculationAll = async (): Promise<void> => {
    const { results, modifiedStageOrder } = await this.getAllRiderResults();

    console.log({ results, modifiedStageOrder });
    console.log('This is handler for rule:RecalculationAll');
  };

  private handleStepChange = async (): Promise<void> => {
    console.log('This is handler for rule:StepChange');
  };

  /**
   * Получение всех результатов райдера, у которого изменяется категория.
   * Возвращает список всех этапов (с id результатов и их порядковыми номерами)
   * и номер этапа, в котором модератор вносит исходное изменение.
   */
  private async getAllRiderResults(): Promise<{
    results: { id: string; stageOrder: number }[];
    modifiedStageOrder: number;
  }> {
    const stageResultId = this.dataForModifyCategory.stageResultId;

    // Получем zwiftId и номер этапа в котором производиться первоначальное изменение категории.
    const resultDB = await StageResultModel.findById(stageResultId, {
      order: true,
      profileId: true,
      _id: false,
    }).lean<{ order: number; profileId: number }>();

    if (!resultDB) {
      throw new Error(
        `Не найден результат "${stageResultId}", в котором изменяется категория у райдера`
      );
    }

    const resultsDB = await StageResultModel.find(
      { profileId: resultDB.profileId },
      { _id: true, order: true }
    )
      .sort({ order: 1 })
      .lean<{ _id: Types.ObjectId; order: number }[]>();

    const results = resultsDB.map(({ _id, order }) => ({
      id: _id.toString(),
      stageOrder: order,
    }));

    return { results, modifiedStageOrder: resultDB.order };
  }
}
