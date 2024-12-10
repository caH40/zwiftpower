import { handleAndLogError } from '../../errors/error.js';
import { Rider } from '../../Model/Rider.js';

// types
import { EventWithSubgroup } from '../../types/types.interface.js';

/**
 * Добавление RacingScore райдеров в результаты. (Мутация объекта.)
 */
export async function addRacingScores(event: EventWithSubgroup) {
  try {
    const results = event.results;
    if (!results) {
      return;
    }
    const zwiftIds = results.map(({ profileId }) => profileId);

    const racingScores = await Rider.find(
      { zwiftId: zwiftIds },
      { 'competitionMetrics.racingScore': true, zwiftId: true, _id: false }
    ).lean<{ competitionMetrics?: { racingScore: number }; zwiftId: number }[]>();

    const racingScoresMap = new Map(
      racingScores.map((elm) => [
        elm.zwiftId,
        { racingScore: elm.competitionMetrics?.racingScore },
      ])
    );
    for (const result of results) {
      const racingScore = racingScoresMap.get(result.profileId)?.racingScore;

      result.profileData.racingScore = racingScore;
    }
  } catch (error) {
    handleAndLogError(error);
  }
}
