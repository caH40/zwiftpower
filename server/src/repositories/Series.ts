import { NSeriesModel } from '../Model/NSeries.js';

// types
import { TSeries } from '../types/model.interface.js';

export class SeriesRepository {
  /**
   * Для TourGCManager.update.
   * По seriesId получение данных name,stages.
   */
  getStageIds = async (seriesId: string) => {
    return await NSeriesModel.findOne({ _id: seriesId }, { _id: 0, name: 1, stages: 1 }).lean<
      Pick<TSeries, 'name' | 'stages'>
    >();
  };
}
