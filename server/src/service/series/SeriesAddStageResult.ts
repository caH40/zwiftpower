import { SeriesRepository } from '../../repositories/Series.js';
import { getOrThrow } from '../../utils/getOrThrow.js';

export class SeriesAddStageResult {
  private seriesRepository = new SeriesRepository();

  /**
   * 1. Если несколько заездов на этапе, определить какой эвент главный, а какие перезаезды. Использовать _id главного эвента на этапе.
   *
   * 2.
   */
  async add(data: {
    durationInMilliseconds: number;
    stageOrder: number;
    profileId: number;
    seriesId: string;
    moderatorId: string;
  }) {
    const series = await getOrThrow(
      this.seriesRepository.getById(data.seriesId),
      `Серия с _id: ${data.seriesId} не найдена в базе данных.`
    );

    console.log(data);
  }
}
