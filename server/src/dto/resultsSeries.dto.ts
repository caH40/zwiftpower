// types
import { ResultsSeriesDtoArg } from '../types/types.interface.js';
import { ResultsSeriesFetch } from '../common/types/resultsSeries.interface.js';
import { TGeneralClassificationDB } from '../types/mongodb-response.types.js';
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
  generalClassificationSeries: TGeneralClassificationDB[],
  gcResultsUpdatedAt: Date | undefined
): TGeneralClassificationDto {
  return {
    results: generalClassificationSeries.map(({ createdAt: _c, updatedAt: _u, ...gc }) => {
      return { ...gc, _id: String(gc._id) };
    }),
    gcResultsUpdatedAt: gcResultsUpdatedAt && gcResultsUpdatedAt.toISOString(),
  };
}
