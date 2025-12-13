import { Types } from 'mongoose';
import { handleAndLogError } from '../errors/error.js';
import { EventRepository } from '../repositories/Event.js';
import { EventResultRepository } from '../repositories/EventResult.js';
import { parseSeasonLabel } from '../utils/season.js';
import { TeamRepository } from '../repositories/Team.js';
import { TeamSeasonRatingRepository } from '../repositories/TeamSeasonRating.js';

export class TeamScoreAggregator {
  private eventRepository: EventRepository = new EventRepository();
  private eventResultRepository: EventResultRepository = new EventResultRepository();
  private teamRepository: TeamRepository = new TeamRepository();
  private ratingRepository: TeamSeasonRatingRepository = new TeamSeasonRatingRepository();

  /**
   * Утилита расчета рейтинговых ZP очков команды по заработанным очкам в заездах.
   * 1. Получение всех Эвентов за определенный сезон и которые являются рейтинговыми.
   * 2. Получение всех результатов заездов и результатов этапов, которые принадлежат командным
   * райдерам и у которых zpruFinishPoints > 0;
   * 3. Суммирование очков для соответствующих команд.
   * 4. Сохранение в БД.
   */

  recalculateTeamSeasonRating = async (seasonLabel: string): Promise<void> => {
    try {
      const dates = parseSeasonLabel(seasonLabel);

      if (!dates) {
        throw new Error(`Не корректное название сезона: ${seasonLabel}`);
      }

      // Рейтинговые эвенты за запрашиваемый сезон seasonLabel.
      const events = await this.eventRepository.getRated(dates.start, dates.end);

      const eventIds = events.map(({ _id }) => _id);

      const results = await this.eventResultRepository.getForTeamSeasonRating(eventIds);

      const resultsWithTeamId = await this.setTeamId(results);

      const resultsWithSum = this.getSum(resultsWithTeamId);

      // Установка ранкинга.
      const teamSeasonRating = this.getRanking(resultsWithSum);

      // Сохранение в БД.
      await this.ratingRepository.upsertMany(teamSeasonRating, seasonLabel);
    } catch (error) {
      handleAndLogError(error);
    }
  };

  /**
   * Установка _id команды вместо urlSlug.
   */
  setTeamId = async (
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

  private getRanking(
    results: { teamId: string; points: number; eventIds: string[] }[]
  ): { teamId: string; rank: number; points: number; eventIds: string[] }[] {
    const sorted = results.toSorted((a, b) => b.points - a.points);

    return sorted.map((res, index) => ({ ...res, rank: index + 1 }));
  }
}
