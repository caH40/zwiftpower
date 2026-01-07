// types
import { ResultsSeriesDtoArg, TGeneralClassificationEdited } from '../types/types.interface.js';
import { ResultsSeriesFetch } from '../common/types/resultsSeries.interface.js';
import { TGeneralClassificationDto } from '../types/dto.interface.js';

export const resultsSeriesDto = ({
  results,
  resultsSummary,
  leaderboardCatchup,
}: ResultsSeriesDtoArg) => {
  // заготовка для дальнейшей оптимизации
  // меняется только типизация на общий интерфейс
  const resultsSeries: ResultsSeriesFetch = {
    results,
    resultsSummary,
    leaderboard: leaderboardCatchup,
  };
  return resultsSeries;
};

/**
 * DTO для генеральной классификации серии заездов.
 */
export function generalClassificationDto(
  generalClassificationSeries: TGeneralClassificationEdited[],
  gcResultsUpdatedAt: Date | undefined
): TGeneralClassificationDto {
  const gcResults = generalClassificationSeries.map(
    ({ createdAt: _c, updatedAt: _u, stages, ...gc }) => {
      const stagesWithProfileData = stages.map((s) => ({
        category: s.category,
        stageOrder: s.stageOrder,
        durationInMilliseconds: s.durationInMilliseconds,
        distanceInMeters: s.distanceInMeters,
        elevationInMeters: s.elevationInMeters,
        calories: s.calories,
        finishPoints: s.finishPoints,
        raceRank: s.raceRank,
      }));

      return { ...gc, _id: String(gc._id), stages: stagesWithProfileData };
    }
  );

  return {
    results: gcResults,
    gcResultsUpdatedAt: gcResultsUpdatedAt && gcResultsUpdatedAt.toISOString(),
  };
}
