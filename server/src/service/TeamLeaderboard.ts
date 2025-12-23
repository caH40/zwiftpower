import { TeamRepository } from '../repositories/Team.js';
import { TeamMemberRepository } from '../repositories/TeamMember.js';
import { teamLeaderboardDto, teamTopLeaderboardDto } from '../dto/team-leaderboard.js';
import { TeamSeasonRatingService } from './TeamSeasonRating.js';
import { getSeasonPeriod, parseSeasonLabel } from '../utils/season.js';
import { TeamSeasonRatingRepository } from '../repositories/TeamSeasonRating.js';

// types
import { TResponseService } from '../types/http.interface.js';
import { TTeamLeaderboard } from '../types/team.types.js';
import { TTeamLeaderboardDto, TTeamTopLeaderboardDto } from '../types/dto.interface.js';
import { TTeamSeasonRating } from '../types/model.interface.js';

/**
 * Класс формирования таблицы рейтинга команд.
 */
export class TeamLeaderboard {
  private teamRepository: TeamRepository;
  private memberRepository: TeamMemberRepository;
  private teamSeasonRatingService: TeamSeasonRatingService = new TeamSeasonRatingService();
  private ratingRepository: TeamSeasonRatingRepository = new TeamSeasonRatingRepository();

  constructor() {
    this.teamRepository = new TeamRepository();
    this.memberRepository = new TeamMemberRepository();
  }
  /**
   * Рейтинг команд с данными по медалям, количеству участников, количеству заездов.
   */
  async get(seasonLabel: string): Promise<TResponseService<TTeamLeaderboardDto[]>> {
    const dates = parseSeasonLabel(seasonLabel);

    if (!dates) {
      throw new Error(`Не корректное название сезона: ${seasonLabel}`);
    }

    const teamsRating = await this.teamSeasonRatingService.getAll(seasonLabel);

    // Получение всех команд с количеством участников.
    const teamsWithMembers = await this.getTeamsWithQuantityMembers();

    const teamsWithRank = this.setRank(teamsWithMembers, teamsRating);

    return { data: teamLeaderboardDto(teamsWithRank), message: 'Рейтинг команд' };
  }

  /**
   * Рейтинг команд с данными по медалям, количеству участников, количеству заездов.
   */
  async getTop(): Promise<TResponseService<TTeamTopLeaderboardDto[]>> {
    const season = getSeasonPeriod(new Date());

    if (!season) {
      throw new Error('Ошибка при формировании seasonLabel');
    }

    const teamsRating = await this.ratingRepository.getTop(season.label);

    return { data: teamTopLeaderboardDto(teamsRating), message: 'Рейтинг top3 команд' };
  }

  /**
   * Установка рейтинговых очков и установка рейтинга.
   */
  private setRank = (
    teams: Map<string, TTeamLeaderboard>,
    teamsRating: (Omit<TTeamSeasonRating, 'eventsIds' | 'team'> & {
      team: { urlSlug: string };
    })[]
  ): TTeamLeaderboard[] => {
    teamsRating.forEach((team) => {
      const current = teams.get(team.team.urlSlug);

      if (current) {
        current.rank = team.rank;
        current.rankPoints = team.points;
      }
    });

    const sortedTeams = [...teams.values()]
      .toSorted((a, b) => b.rankPoints - a.rankPoints)
      .map((team, index) => ({ ...team, rank: index + 1 }));

    return sortedTeams;
  };

  private getTeamsWithQuantityMembers = async (): Promise<Map<string, TTeamLeaderboard>> => {
    const teamsMap: Map<string, TTeamLeaderboard> = new Map();

    const [teams, members] = await Promise.all([
      this.teamRepository.getAllForClient(),
      this.memberRepository.getAll(),
    ]);

    for (const { urlSlug, _id, name, shortName, logoFileInfo, posterFileInfo } of teams) {
      const totalMembers = members.filter(({ team }) => team.equals(_id))?.length ?? 0;

      const teamData = teamsMap.get(urlSlug) ?? {
        _id: _id.toString(),
        urlSlug,
        name,
        shortName,
        logoFileInfo,
        posterFileInfo,
        rank: 0,
        rankPoints: 0,
        totalMembers,
        averageRacingScore: 0,
        totalResults: 0,
        eventMedals: {
          gold: 0,
          silver: 0,
          bronze: 0,
        },
      };
      teamsMap.set(urlSlug, teamData);
    }

    return teamsMap;
  };
}
