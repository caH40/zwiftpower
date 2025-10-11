import { Types } from 'mongoose';
import { StageResultModel } from '../Model/StageResult.js';

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
}
