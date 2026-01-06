import { Types } from 'mongoose';
import { handleAndLogError } from '../../errors/error.js';
import { TeamRepository } from '../../repositories/Team.js';
import { StageResultRepository } from '../../repositories/StageResult.js';

/**
 * Получение очков из Эвентов, которые являются этапами серий и для которых
 * создаются отдельные результаты.
 */
export class StageResult {
  private teamRepository: TeamRepository = new TeamRepository();
  private stageResultRepository: StageResultRepository = new StageResultRepository();

  /**
   * Обработка результатов этапов для командных райдеров.
   */
  public handle = async (
    eventsWithStageResults: EventIdAndSeriesId[]
  ): Promise<
    {
      teamId: string;
      points: number;
      seriesIds: string[];
    }[]
  > => {
    const seriesObjectIds = eventsWithStageResults
      .map((e) => e.seriesId?._id)
      .filter((id): id is Types.ObjectId => Boolean(id));

    // Id нумерация Эвентов из API Zwift.
    const eventWithStageResultsIds = new Set<string>(
      seriesObjectIds.map((id) => id.toString())
    );

    // Результаты этапов для командных райдеров.
    const stageResults = await this.stageResultRepository.getForTeamSeasonRating(
      Array.from(eventWithStageResultsIds)
    );

    const resultsWithTeamId = await this.setTeamId(stageResults);

    // Суммирование очков для каждой команды и массив Эвентов из которых брались результаты.
    const resultsWithSum = this.getSum(resultsWithTeamId);

    return resultsWithSum;
  };

  /**
   * Установка _id команды вместо urlSlug для результатов этапов серии.
   */
  private setTeamId = async (
    stageResults: {
      series: Types.ObjectId;
      points: {
        zpruFinishPoints: number;
      };
      profileData: {
        team?: {
          urlSlug: string;
        };
      };
    }[]
  ): Promise<{ teamId: string; points: number; seriesId: string }[]> => {
    const teamUrlSlugs = new Set<string>();

    stageResults.forEach((res) => {
      const urlSlug = res.profileData.team?.urlSlug;

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

    const resultsWithTeamId = [] as { teamId: string; points: number; seriesId: string }[];

    stageResults.forEach((res) => {
      const urlSlug = res.profileData?.team?.urlSlug;
      const teamId = urlSlug && teamIdsMap.get(urlSlug);

      if (teamId) {
        resultsWithTeamId.push({
          teamId,
          points: res.points.zpruFinishPoints,
          seriesId: res.series.toString(),
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
      seriesId: string;
    }[]
  ): { teamId: string; points: number; seriesIds: string[] }[] {
    const points = new Map<string, { points: number; seriesIds: Set<string> }>();

    resultsWithTeamId.forEach((res) => {
      const current = points.get(res.teamId);
      if (current) {
        current.points = current.points + res.points;
        current.seriesIds.add(res.seriesId);
      } else {
        points.set(res.teamId, { points: res.points, seriesIds: new Set([res.seriesId]) });
      }
    });

    const totalResults = [...points.entries()].reduce<
      { teamId: string; points: number; seriesIds: string[] }[]
    >((acc, cur) => {
      acc.push({ teamId: cur[0], points: cur[1].points, seriesIds: [...cur[1].seriesIds] });

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
