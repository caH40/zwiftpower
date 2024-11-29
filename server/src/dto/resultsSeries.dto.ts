// types
import { ResultsSeriesDtoArg } from '../types/types.interface.js';
import { ResultsSeriesFetch } from '../common/types/resultsSeries.interface.js';

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
