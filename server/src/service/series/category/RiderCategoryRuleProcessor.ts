import { TRiderCategoryRuleType } from '../../../types/series.types';
import { TRaceSeriesCategories } from '../../../types/types.interface';

type ModifiedCategory = {
  value: TRaceSeriesCategories | null;
  moderator?: string;
  modifiedAt: Date;
  reason?: string;
};

export class RiderCategoryRuleProcessor {
  private handlers: Map<TRiderCategoryRuleType, () => Promise<void>>;

  constructor(
    private readonly seriesId: string,
    private readonly modifiedCategory: ModifiedCategory
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

  private handleRecalculationAll = async (): Promise<void> => {
    console.log('This is handler for rule:RecalculationAll');
  };
  private handleStepChange = async (): Promise<void> => {
    console.log('This is handler for rule:StepChange');
  };
}
