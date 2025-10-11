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

/**
 * Сервис работы с категориями в результатах этапов серии (туров) (и ГС?)
 *
 * -автоматическое определение;
 * -присвоение райдерам в результатах этапов серий (туров).
 */
export class SeriesCategoryService {
  constructor(private seriesId: string) {}

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

    // Изменение таблиц в результате изменения категории у райдера, согласно правилу riderCategoryRule.
    if (riderCategoryRule) {
      await categoryRuleProcessor.execute(riderCategoryRule);
    }

    const result = await StageResultModel.findByIdAndUpdate(
      stageResultId,
      {},
      { new: true }
    ).lean();

    if (!result) {
      throw new Error(
        `Не найден результат для изменения категории resultId: ${stageResultId}!`
      );
    }

    // Обновление генеральной классификации серии.
    const tourGC = new TourGCManager(this.seriesId);
    await tourGC.update();

    return {
      data: null,
      message: `Обновлена категория участника ${result.profileData.firstName} ${result.profileData.lastName} с "${result.category}" на "${value}"`,
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

    // Если это самый первый этап в серии заездов (нулевым или первым).
    if (stageOrder === Math.min(...series.stages.map(({ order }) => order))) {
      return this.assignCategoryFromFirstStage(stageResults, series.categoriesWithRange);
    }

    // Определение категории из прошлого этапа данной серии.
    // Получить данные по категориям райдеров из прошлого заезда и присвоить соответствующую категорию в данном этапе.

    return await this.assignCategory(stageResults, stageOrder, series.categoriesWithRange);
  }

  /**
   * Расчет и присвоение категорий райдерам в результатах этапа, кроме первого в серии.
   */
  private async assignCategory(
    stageResults: TStageResult[],
    stageOrder: number,
    categoriesWithRange?: TCategoriesWithRange[]
  ): Promise<TStageResult[]> {
    // Время обновления.
    const now = new Date();

    // Результаты райдера предыдущего этапа для каждого райдера.
    const previousStagesResults = await this.getPreviousStagesResults(stageOrder);

    return stageResults.map((result) => {
      const prev = previousStagesResults.get(result.profileId);

      // Если у райдера уже участвовал в серии заездов (есть предыдущий результат).
      if (prev) {
        result.category = prev.modifiedCategoryValue ?? prev.category;

        // FIXME: Если нет categoriesWithRange и райдер поменял группу по сравнению с предыдущим этапом,
        // то устанавливается категория новой группы.
        // if (result.category !== result.activityData.subgroupLabel && !categoriesWithRange) {
        //   result.modifiedCategory = {
        //     value: result.activityData.subgroupLabel,
        //     modifiedAt: now,
        //     reason: 'Райдер участвовал в другой группе относительно предыдущего этапа.',
        //   };
        // }
        // FIXME: если по какой то причине result.category = null, продумать обработку.
      } else {
        // если это первый этап для райдера, то рассчитываем категорию для modifiedCategory
        this.assignModifiedCategoryToResult(result, now, categoriesWithRange);
      }

      return result;
    });
  }

  /**
   * Расчет и присвоение категорий, если это первый этап в серии заездов (туре)
   */
  private assignCategoryFromFirstStage(
    stageResults: TStageResult[],
    categoriesWithRange?: TCategoriesWithRange[]
  ): TStageResult[] {
    // Время обновления.
    const now = new Date();

    return stageResults.map((result) => {
      result.category = null;

      // Изменение поля modifiedCategory.
      this.assignModifiedCategoryToResult(result, now, categoriesWithRange);

      return result;
    });
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
   * Присваивает modifiedCategory одному результату.
   */
  private assignModifiedCategoryToResult(
    result: TStageResult,
    now: Date,
    categoriesWithRange?: TCategoriesWithRange[]
  ): void {
    // FTP рассчитывается на результатах текущего этапа.
    const cp20 = result.cpBestEfforts.find((cp) => cp.duration === 1200);
    const riderFtp = cp20 ? { watt: cp20.watts * 0.95, wattPerKg: cp20.wattsKg * 0.95 } : null;

    // Определение новой категории.
    let newCategory: TRaceSeriesCategories | null = result.activityData.subgroupLabel;

    if (categoriesWithRange && riderFtp) {
      newCategory = calculateRiderCategory({
        riderCPs: result.cpBestEfforts,
        riderFtp,
        categoriesWithRange,
      });
    }

    // Причина назначения категории.
    let reason = 'Категория присвоена согласно группе заезда.';

    if (categoriesWithRange && !riderFtp) {
      reason = 'Категория не присвоена, нет данных по FTP.';
      newCategory = null;
    } else if (categoriesWithRange && riderFtp) {
      reason = 'Категория присвоена, согласно правилам категоризации в серии.';
    }

    // Обновление результата.
    result.modifiedCategory = {
      value: newCategory,
      modifiedAt: now,
      reason,
    };
  }

  /**
   * -запросить результаты всех этапов серии;
   * -сделать группировку по каждому райдеру;
   * -сделать сортировку по убыванию номеров этапов;
   *
   */
  private async getPreviousStagesResults(stageOrder: number): Promise<
    Map<
      number,
      {
        category: TRaceSeriesCategories | null;
        modifiedCategoryValue?: TRaceSeriesCategories | null;
      }
    >
  > {
    const orderNumber = Number(stageOrder);
    if (isNaN(orderNumber)) {
      throw new Error(`Invalid stageOrder: ${stageOrder}`);
    }

    // Все предыдущие этапы серии всех райдеров.
    const resultsDB = await StageResultModel.find(
      {
        seriesId: this.seriesId,
        order: { $lt: orderNumber },
      },
      { _id: false, order: true, profileId: true, category: true, modifiedCategory: true }
    ).lean();

    // Инициализация коллекции.
    const resultsMap: Map<
      number,
      {
        category: TRaceSeriesCategories | null;
        modifiedCategoryValue?: TRaceSeriesCategories | null;
        order: number;
      }[]
    > = new Map();

    for (const { profileId, category, modifiedCategory, order } of resultsDB) {
      const modifiedCategoryValue = modifiedCategory?.value;

      const arr = resultsMap.get(profileId) ?? [];
      arr.push({ category, modifiedCategoryValue, order });
      resultsMap.set(profileId, arr);
    }

    const prevResultsMap: Map<
      number,
      {
        category: TRaceSeriesCategories | null;
        modifiedCategoryValue?: TRaceSeriesCategories | null;
      }
    > = new Map();

    // console.log(resultsMap);

    for (const [profileId, arr] of resultsMap.entries()) {
      if (arr.length === 0) {
        continue;
      }

      const { category, modifiedCategoryValue } = arr.sort((a, b) => b.order - a.order)[0];

      prevResultsMap.set(profileId, { category, modifiedCategoryValue });
    }

    return prevResultsMap;
  }
}
