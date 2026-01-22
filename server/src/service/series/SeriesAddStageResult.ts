import { SeriesRepository } from '../../repositories/Series.js';
import { ProfileDataInResult, TStageResult } from '../../types/model.interface.js';
import { getOrThrow } from '../../utils/getOrThrow.js';

export class SeriesAddStageResult {
  private seriesRepository = new SeriesRepository();

  /**
   * 1. Если несколько заездов на этапе, определить какой эвент главный, а какие перезаезды. Использовать _id главного эвента на этапе.
   *
   * 2.
   */
  async add(
    data: {
      durationInMilliseconds: number;
      stageOrder: number;
      profileId: number;
      seriesId: string;
      moderatorId: string;
    } & ProfileDataInResult
  ) {
    const { stages } = await getOrThrow(
      this.seriesRepository.getById(data.seriesId),
      `Серия с _id: ${data.seriesId} не найдена в базе данных.`
    );

    // для каждого эвента получить totalFinishedCount, у кого больше, тот главный эвент.
    const eventsInStage = stages.filter((s) => s.order === data.stageOrder).map((s) => s.event);

    const result = {} as Pick<
      TStageResult,
      | 'order'
      | 'eventId'
      | 'profileId'
      | 'profileData'
      | 'cpBestEfforts'
      | 'rank'
      | 'finishTimeClassification'
      | 'activityData'
      | 'category'
      | 'categoryInRace'
      | 'finishersCount'
      | 'points'
      | 'disqualification'
      | 'timePenalty'
      | 'timePenalty'
      | 'teamSquadAtRace'
      | 'sensorData'
      | 'finishTimeLimit'
      | 'finalDurationInMilliseconds'
    >;
    result.series = data.seriesId;

    console.log(data);
    console.log(result);
  }
}
