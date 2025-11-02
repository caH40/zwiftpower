import { SeriesClassificationModel } from '../Model/SeriesClassification.js';

export class SeriesClassificationRepository {
  deleteMany = async (seriesId: string): Promise<void> => {
    await SeriesClassificationModel.deleteMany({
      seriesId: seriesId,
    });
  };
}
