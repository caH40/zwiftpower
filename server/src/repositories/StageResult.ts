import { QueryOptions, Types, UpdateQuery } from 'mongoose';
import { StageResultModel } from '../Model/StageResult.js';
import { FilterQuery } from 'mongoose';
import { TStageResult } from '../types/model.interface.js';
import { TRaceSeriesCategories } from '../types/types.interface.js';
import { TStagesResultsForGC } from '../types/mongodb-response.types.js';

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

    const updateQuery: UpdateQuery<TStageResult> = {
      $set: { category: modifiedCategory.value, modifiedCategory },
    };

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

  /**
   * Все результаты текущей серии заездов.
   */
  async getAllStagesResults(seriesId: string): Promise<TStagesResultsForGC[]> {
    return StageResultModel.find(
      { series: seriesId },
      {
        order: true,
        profileId: true,
        profileData: true,
        activityData: true,
        category: true,
        rank: true,
        points: true,
        disqualification: true,
        teamSquadAtRace: true,
        modifiedCategory: true,
      }
    ).lean<TStagesResultsForGC[]>();
  }

  /**
   * Получение всех результатов этапа по eventId и stageOrder.
   */
  async getAllStageResultsByEventId(
    seriesId: string,
    stageOrder: number
  ): Promise<TStageResult[]> {
    return await StageResultModel.find({ series: seriesId, order: stageOrder }).lean();
  }

  /**
   * Обновление результатов этапа.
   */
  async updateMany(updates: { _id: string; query: QueryOptions<TStageResult> }[]) {
    return StageResultModel.bulkWrite(
      updates.map((u) => ({
        updateOne: {
          filter: { _id: u._id },
          update: { $set: u.query },
        },
      }))
    );
  }
}
