import { MEDAL_RATES } from '../assets/constants.js';
import { EventResultRepository } from '../repositories/EventResult.js';
import { TeamRepository } from '../repositories/Team.js';
import { TeamMemberRepository } from '../repositories/TeamMember.js';

// types
import { TResponseService } from '../types/http.interface.js';
import { TTeamLeaderboard } from '../types/team.types.js';
import { TTeamLeaderboardDto } from '../types/dto.interface.js';

export class TeamLeaderboard {
  private teamRepository: TeamRepository;
  private eventResultRepository: EventResultRepository;
  private memberRepository: TeamMemberRepository;

  constructor() {
    this.teamRepository = new TeamRepository();
    this.eventResultRepository = new EventResultRepository();
    this.memberRepository = new TeamMemberRepository();
  }
  /**
   * Рейтинг команд с данными по медалям, количеству участников, количеству заездов.
   */
  async get(): Promise<TResponseService<TTeamLeaderboardDto[]>> {
    // Получение всех команд с количеством участников.
    const teamsWithMembers = await this.getTeamsWithQuantityMembers();

    const teamsWithMedals = await this.countEventMedals(teamsWithMembers);

    const teamsWithRank = this.setRank(teamsWithMedals);

    return { data: teamsWithRank, message: 'Рейтинг команд' };
  }

  /**
   * Расчет рейтинговых очков и установка рейтинга.
   */
  private setRank = (teams: TTeamLeaderboard[]): TTeamLeaderboard[] => {
    const teamsWithPoints = teams.map((team) => {
      team.rankPoints = this.calculateRankPoints(team.eventMedals);
      return team;
    });

    // Сортировка по очкам.
    teamsWithPoints.sort((a, b) => b.rankPoints - a.rankPoints);

    teamsWithPoints.forEach((team, index) => {
      team.rank = index + 1;
    });

    return teamsWithPoints;
  };

  /**
   * Утилита расчета рейтинговых очков команды.
   */
  private calculateRankPoints = (eventMedals: {
    gold: number;
    silver: number;
    bronze: number;
  }): number => {
    return (
      eventMedals.gold * MEDAL_RATES.GOLD +
      eventMedals.silver * MEDAL_RATES.SILVER +
      eventMedals.bronze * MEDAL_RATES.BRONZE
    );
  };

  private countEventMedals = async (
    teamsWithMembers: Map<string, TTeamLeaderboard>
  ): Promise<TTeamLeaderboard[]> => {
    // Все результаты райдеров, которые состоят в командах.
    const allResultTeams = await this.eventResultRepository.getForTeamLeaderBoards();

    for (const result of allResultTeams) {
      const urlSlug =
        result.profileDataMain?.team?.urlSlug || result.profileData?.team?.urlSlug;

      if (!urlSlug) {
        continue;
      }

      const team = teamsWithMembers.get(urlSlug);

      if (!team) {
        continue;
      }

      const medal = {
        1: 'gold',
        2: 'silver',
        3: 'bronze',
      }[result.rank] as 'gold' | 'silver' | 'bronze' | undefined;

      if (!medal) {
        continue;
      }

      team.eventMedals[medal]++;
      team.totalResults++;

      teamsWithMembers.set(urlSlug, team);
    }

    return [...teamsWithMembers.values()];
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
