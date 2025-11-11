import { SeriesClassificationModel } from '../Model/SeriesClassification.js';

// types
import { TGCForSave } from '../types/types.interface.js';

export class SeriesClassificationRepository {
  deleteMany = async (seriesId: string): Promise<void> => {
    await SeriesClassificationModel.deleteMany({
      seriesId: seriesId,
    });
  };

  create = async (gc: TGCForSave[]): Promise<void> => {
    await SeriesClassificationModel.create(gc);
  };
}
