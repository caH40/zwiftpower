import { Types, UpdateQuery } from 'mongoose';
import { StageResultModel } from '../Model/StageResult.js';
import { FilterQuery } from 'mongoose';
import { TStageResult } from '../types/model.interface.js';
import { TRaceSeriesCategories } from '../types/types.interface.js';

export class StageResultRepository {
  /**
   * Запрос для RiderCategoryRuleProcessor.getAllRiderResults
   * Данные об zwiftId райдера и о номере этапа.
   */
  async getZwiftIdAndStageOrder(
    id: string
  ): Promise<{ order: number; profileId: number } | null> {
    return await StageResultModel.findById(id, {
      order: 1,
      profileId: 1,
      _id: 0,
    }).lean();
  }

  /**
   * Запрос для RiderCategoryRuleProcessor.getAllRiderResults
   * Данные из всех этапов _id, order.
   */
  async getIdAndStageOrderFromAllStages(
    zwiftId: number
  ): Promise<{ _id: Types.ObjectId; order: number }[]> {
    return await StageResultModel.find({ profileId: zwiftId }, { _id: true, order: true })
      .sort({ order: 1 })
      .lean();
  }

  /**
   * Запрос для RiderCategoryRuleProcessor.handleRecalculationAll
   * Изменение категории у райдера во всех завершенных этапах серии.
   */
  async changeRiderCategoryInStages(
    resultIds: string[],
    modifiedCategory: {
      value: TRaceSeriesCategories | null;
      moderator: string | undefined;
      modifiedAt: Date;
      reason: string;
    }
  ): Promise<void> {
    const query: FilterQuery<TStageResult> = {
      _id: { $in: resultIds },
    };

    const updateQuery: UpdateQuery<TStageResult> = { $set: { modifiedCategory } };

    await StageResultModel.updateMany(query, updateQuery);
  }

  /**
   * Получение результата райдера на этапе серии по _id.
   */
  async getStageResultById(_id: string): Promise<TStageResult | null> {
    return await StageResultModel.findById(_id).lean();
  }
  /**
   * Получение результатов всех этапов серии по _id.
   */
  async getAllStageResultsBySeriesId(_id: string): Promise<TStageResult[]> {
    return await StageResultModel.find({ series: _id }).lean();
  }
}
