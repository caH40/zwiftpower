import { NSeriesModel } from '../../../Model/NSeries.js';
import { StageResultModel } from '../../../Model/StageResult.js';
import { calculateRiderCategory } from '../../../utils/calculateRiderCategory.js';
import { TourGCManager } from '../tour/TourGCManager.js';

// types
import { TSeries, TStageResult } from '../../../types/model.interface.js';
import { TCategoriesWithRange } from '../../../types/series.types.js';
import {
  TRaceSeriesCategories,
  TSetCategoriesStageParams,
} from '../../../types/types.interface.js';
import { RiderCategoryRuleProcessor } from './RiderCategoryRuleProcessor.js';
import { StageResultRepository } from '../../../repositories/StageResult.js';
import { SeriesStageProtocolManager } from '../SeriesStageProtocolManager.js';

/**
 * Сервис работы с категориями в результатах этапов серии (туров) (и ГС?)
 *
 * -автоматическое определение;
 * -присвоение райдерам в результатах этапов серий (туров).
 */
export class SeriesCategoryService {
  private stageResultRepository: StageResultRepository;

  constructor(private seriesId: string) {
    this.stageResultRepository = new StageResultRepository();
  }

  /**
   * Изменение категории у участника в результате заезда на этапа.
   */
  public async modifyCategory({
    moderator,
    value,
    stageResultId,
    reason,
  }: {
    stageResultId: string;
    moderator?: string;
    value: TRaceSeriesCategories | null;
    reason?: string;
  }): Promise<{ data: null; message: string }> {
    const categoryRuleProcessor = new RiderCategoryRuleProcessor(this.seriesId, {
      moderator,
      value,
      stageResultId,
      reason,
    });

    const { riderCategoryRule } = await this.getSeriesData();

    // Изменение категории согласно правилу в серии riderCategoryRule.
    if (riderCategoryRule) {
      await categoryRuleProcessor.execute(riderCategoryRule);
    }

    // Пересчитать все финишные протоколы этапов из-за изменения категории у райдера.
    const stageProtocolManager = new SeriesStageProtocolManager(this.seriesId);
    await stageProtocolManager.recalculateStageProtocol(this.seriesId);

    // Обновление генеральной классификации серии.
    const tourGC = new TourGCManager(this.seriesId);
    await tourGC.update();

    // Данные для создание сообщения ответа.
    const result = await this.stageResultRepository.getStageResultById(stageResultId);

    return {
      data: null,
      message: `Обновлена категория участника ${result?.profileData.firstName} ${result?.profileData.lastName} с "${result?.category}" на "${value}"`,
    };
  }

  /**
   * Установка категорий райдерам в финишном протоколе этапа серии заездов.
   */
  public async autoAssignRiderCategories({
    stageResults,
    stageOrder,
  }: TSetCategoriesStageParams): Promise<TStageResult[]> {
    const series = await this.getSeriesData();

    // Категории райдеров из предыдущих для них результата этапа серии.
    const previousStagesResults = await this.getCategoriesFromPreviousStagesResults(stageOrder);

    // Инициализация итогового массива.
    const resultsWithCategories = [] as TStageResult[];

    for (const result of stageResults) {
      const prevCategory = previousStagesResults.get(result.profileId);

      // Если нет категории, то райдер проехал свой первый этап в серии.
      if (!prevCategory) {
        const r = this.assignCategoryFromFirstStage(result, series.categoriesWithRange);
        resultsWithCategories.push(r);
      } else {
        const r = await this.assignCategory(result, prevCategory, series.categoriesWithRange);
        resultsWithCategories.push(r);
      }
    }

    return resultsWithCategories;
  }

  /**
   * Расчет и присвоение категорий райдерам в результатах этапа, кроме первого в серии.
   */
  private async assignCategory(
    stageResult: TStageResult,
    prevCategory: TRaceSeriesCategories,
    categoriesWithRange?: TCategoriesWithRange[]
  ): Promise<TStageResult> {
    const result = { ...stageResult };

    result.categoryInRace = prevCategory;
    result.category = prevCategory;

    if (categoriesWithRange) {
      // FIXME: Сделать проверку превышения категории prevCategory в текущем результате result
    }

    return result;
  }

  /**
   * Расчет и присвоение категорий, если это первый этап для райдера в серии заездов (туре).
   */
  private assignCategoryFromFirstStage(
    stageResult: TStageResult,
    categoriesWithRange?: TCategoriesWithRange[]
  ): TStageResult {
    // Время обновления.
    const now = new Date();

    const result = { ...stageResult };

    // Изменение поля modifiedCategory.
    if (categoriesWithRange) {
      this.assignModifiedCategoryToResult(result, now, categoriesWithRange);
    } else {
      result.category = stageResult.activityData.subgroupLabel;
      result.categoryInRace = stageResult.activityData.subgroupLabel;
    }

    return result;
  }

  /**
   * Получает данные серии из базы данных.
   */
  private async getSeriesData() {
    const seriesDB = await NSeriesModel.findOne({ _id: this.seriesId }).lean<TSeries>();

    if (!seriesDB) {
      throw new Error(`Серия с _id: ${this.seriesId} не найдена в базе данных.`);
    }

    return seriesDB;
  }

  /**
   * Мутация данных категорий если существуют свои категории categoriesWithRange.
   */
  private assignModifiedCategoryToResult(
    result: TStageResult,
    now: Date,
    categoriesWithRange: TCategoriesWithRange[]
  ): void {
    // FTP рассчитывается на результатах текущего этапа.
    const cp20 = result.cpBestEfforts.find((cp) => cp.duration === 1200);
    const riderFtp = cp20 ? { watt: cp20.watts * 0.95, wattPerKg: cp20.wattsKg * 0.95 } : null;

    // Если нет получен расчет FTP то:
    if (!riderFtp) {
      result.category = null;
      result.categoryInRace = null;
      result.modifiedCategory = {
        value: null,
        modifiedAt: now,
        reason: 'Категория не присвоена, нет данных по FTP.',
      };

      return;
    }

    const newCategory = calculateRiderCategory({
      riderCPs: result.cpBestEfforts,
      riderFtp,
      categoriesWithRange,
    });

    // Обновление результата.
    result.category = newCategory;
    result.categoryInRace = newCategory;
    result.modifiedCategory = {
      value: newCategory,
      modifiedAt: now,
      reason: 'Категория присвоена, согласно правилам категоризации в серии.',
    };
  }

  /**
   * Получение категорий райдеров из предыдущего (для них) результата этапа.
   * -запросить результаты всех этапов серии;
   * -сделать группировку по каждому райдеру;
   * -сделать сортировку по убыванию номеров этапов;
   *
   */
  private async getCategoriesFromPreviousStagesResults(
    stageOrder: number
  ): Promise<Map<number, TRaceSeriesCategories | null>> {
    const orderNumber = Number(stageOrder);
    if (isNaN(orderNumber)) {
      throw new Error(`Invalid stageOrder: ${stageOrder}`);
    }

    // Все предыдущие этапы серии всех райдеров.
    const resultsDB = await StageResultModel.find(
      {
        series: this.seriesId,
        order: { $lt: orderNumber },
      },
      { _id: false, order: true, profileId: true, category: true }
    ).lean();

    // Инициализация коллекции.
    const resultsMap: Map<number, { category: TRaceSeriesCategories | null; order: number }[]> =
      new Map();

    for (const { profileId, category, order } of resultsDB) {
      const arr = resultsMap.get(profileId) ?? [];
      arr.push({ category, order });
      resultsMap.set(profileId, arr);
    }

    const prevResultsMap: Map<number, TRaceSeriesCategories | null> = new Map();

    for (const [profileId, arr] of resultsMap.entries()) {
      if (arr.length === 0) {
        continue;
      }

      const { category } = arr.sort((a, b) => b.order - a.order)[0];

      prevResultsMap.set(profileId, category);
    }

    return prevResultsMap;
  }
}
