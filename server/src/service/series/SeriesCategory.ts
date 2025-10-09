import { NSeriesModel } from '../../Model/NSeries.js';
import { StageResultModel } from '../../Model/StageResult.js';

// types
import { TSeries, TStageResult } from '../../types/model.interface.js';
import { TCategoriesWithRange } from '../../types/series.types.js';
import {
  TRaceSeriesCategories,
  TSetCategoriesStageParams,
} from '../../types/types.interface.js';
import { calculateRiderCategory } from '../../utils/calculateRiderCategory.js';

/**
 * Сервис работы с категориями в результатах этапов серии (туров) (и ГС?)
 *
 * -автоматическое определение;
 * -присвоение райдерам в результатах этапов серий (туров).
 */
export class SeriesCategoryService {
  constructor(private seriesId: string) {}

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

    // Результаты прошлого этапа.
    const previousStagesResults = await StageResultModel.find(
      {
        seriesId: series._id,
        order: stageOrder - 1,
      },
      { _id: false, profileId: true, category: true }
    ).lean<{ profileId: number; category: TRaceSeriesCategories | null }[]>();

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

      // FTP рассчитывается на результатах текущего этапа.
      const cp20 = result.cpBestEfforts.find((cp) => cp.duration === 1200);
      const riderFtp = cp20
        ? { watt: cp20.watts * 0.95, wattPerKg: cp20.wattsKg * 0.95 }
        : null;

      // Расчет категории.
      let newCategory: TRaceSeriesCategories | null = result.activityData.subgroupLabel;
      if (categoriesWithRange && riderFtp) {
        newCategory = calculateRiderCategory({
          riderCPs: result.cpBestEfforts,
          riderFtp,
          categoriesWithRange,
        });
      }

      let reason = 'Категория присвоена согласно группе заезда.';

      if (categoriesWithRange && !riderFtp) {
        reason = 'Категория не присвоена, нет данных по FTP.';
      } else if (categoriesWithRange && riderFtp) {
        reason = 'Категория присвоена, согласно правилам категоризации в серии.';
      }

      result.modifiedCategory = {
        value: newCategory,
        modifiedAt: now,
        reason,
      };
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
}
