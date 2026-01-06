import { Types } from 'mongoose';
import { handleAndLogError } from '../../errors/error.js';
import { EventResultRepository } from '../../repositories/EventResult.js';
import { TeamRepository } from '../../repositories/Team.js';

/**
 * Получение очков из Эвентов со стандартными результатами.
 */
export class StandardResult {
  private eventResultRepository: EventResultRepository = new EventResultRepository();
  private teamRepository: TeamRepository = new TeamRepository();

  /**
   * Обработка результатов этапов для командных райдеров.
   */
  public handle = async (
    eventsWithStandardResults: EventIdAndSeriesId[]
  ): Promise<
    {
      teamId: string;
      points: number;
      eventIds: string[];
    }[]
  > => {
    // _Id Эвентов из БД.
    const eventWithStandardResultsIds = eventsWithStandardResults.map(({ _id }) => _id);

    const standardResults = await this.eventResultRepository.getForTeamSeasonRating(
      eventWithStandardResultsIds
    );

    // Все результаты райдеров, которые состоят в командах, в заездах со стандартными финишными протоколами.
    const resultsWithTeamId = await this.setTeamIdResults(standardResults);

    // Суммирование очков для каждой команды и массив Эвентов из которых брались результаты.
    const resultsWithSum = this.getSum(resultsWithTeamId);

    return resultsWithSum;
  };

  /**
   * Установка _id команды вместо urlSlug.
   */
  private setTeamIdResults = async (
    results: {
      zwiftEventId: Types.ObjectId;
      points: { zpruFinishPoints: number };
      profileData?: { team?: { urlSlug: string } };
      profileDataMain?: { team?: { urlSlug: string } };
    }[]
  ): Promise<{ teamId: string; points: number; eventId: string }[]> => {
    const teamUrlSlugs = new Set<string>();

    results.forEach((res) => {
      const urlSlug = res.profileDataMain?.team?.urlSlug || res.profileData?.team?.urlSlug;
      if (urlSlug) {
        teamUrlSlugs.add(urlSlug);
      } else {
        handleAndLogError(
          new Error(
            `Не получены данные команды из результата для начисления командных очков ${JSON.stringify(
              res
            )}`
          )
        );
      }
    });

    const teamIds = await this.teamRepository.getIdsByUrlSlugs([...teamUrlSlugs]);

    const teamIdsMap = new Map(teamIds.map((t) => [t.urlSlug, t._id.toString()]));

    const resultsWithTeamId = [] as { teamId: string; points: number; eventId: string }[];

    results.forEach((res) => {
      const urlSlug = res.profileDataMain?.team?.urlSlug || res.profileData?.team?.urlSlug;
      const teamId = urlSlug && teamIdsMap.get(urlSlug);

      if (teamId) {
        resultsWithTeamId.push({
          teamId,
          points: res.points.zpruFinishPoints,
          eventId: res.zwiftEventId.toString(),
        });
      } else {
        handleAndLogError(
          new Error(
            `Не получены данные команды из результата для начисления командных очков ${JSON.stringify(
              res
            )}`
          )
        );
      }
    });

    return resultsWithTeamId;
  };

  private getSum(
    resultsWithTeamId: {
      teamId: string;
      points: number;
      eventId: string;
    }[]
  ): { teamId: string; points: number; eventIds: string[] }[] {
    const points = new Map<string, { points: number; eventIds: Set<string> }>();

    resultsWithTeamId.forEach((res) => {
      const current = points.get(res.teamId);
      if (current) {
        current.points = current.points + res.points;
        current.eventIds.add(res.eventId);
      } else {
        points.set(res.teamId, { points: res.points, eventIds: new Set([res.eventId]) });
      }
    });

    const totalResults = [...points.entries()].reduce<
      { teamId: string; points: number; eventIds: string[] }[]
    >((acc, cur) => {
      acc.push({ teamId: cur[0], points: cur[1].points, eventIds: [...cur[1].eventIds] });

      return acc;
    }, []);

    return totalResults;
  }
}

type EventIdAndSeriesId = {
  _id: Types.ObjectId;
  id: number;
  seriesId?: {
    _id: Types.ObjectId;
    useStageResults?: boolean;
  };
};
