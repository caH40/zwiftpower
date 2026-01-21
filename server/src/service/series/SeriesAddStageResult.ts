export class SeriesAddStageResult {
  async add({
    durationInMilliseconds,
    stageOrder,
    profileId,
    seriesId,
    userId,
  }: {
    durationInMilliseconds: number;
    stageOrder: number;
    profileId: number;
    seriesId: string;
    userId: string;
  }) {
    console.log({
      durationInMilliseconds,
      stageOrder,
      profileId,
      seriesId,
      userId,
    });
  }
}
