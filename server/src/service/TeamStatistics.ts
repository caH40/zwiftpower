import { EventResultRepository } from '../repositories/EventResult.js';
import { RiderRepository } from '../repositories/Rider.js';
import { TeamRepository } from '../repositories/Team.js';
import { TeamMemberRepository } from '../repositories/TeamMember.js';
import { getSeasonPeriod } from '../utils/season.js';

// types
import { TZwiftCategory } from '../types/types.interface.js';
import { TResponseService } from '../types/http.interface.js';
import { TStatistics } from '../types/team.types.js';

export class TeamStatisticsService {
  private teamMemberRepository: TeamMemberRepository;
  private riderRepository: RiderRepository;
  private resultRepository: EventResultRepository;
  private teamRepository: TeamRepository;
  constructor() {
    this.teamMemberRepository = new TeamMemberRepository();
    this.riderRepository = new RiderRepository();
    this.riderRepository = new RiderRepository();
    this.resultRepository = new EventResultRepository();
    this.teamRepository = new TeamRepository();
  }

  /**
   * Статистические данные команды.
   */
  public async get(urlSlug: string): Promise<TResponseService<TStatistics | null>> {
    const team = await this.teamRepository.getByUrlSlug(urlSlug);

    if (!team) {
      throw new Error(`Не найдена команда с urlSlug: "${urlSlug}"`);
    }

    const teamMembers = await this.teamMemberRepository.getTeamMemberData(team._id.toString());

    const teamMembersTotal = teamMembers.length;
    if (teamMembersTotal === 0) {
      return { data: null, message: `Не найдены участники команды ${team.name}!` };
    }

    const zwiftIds = teamMembers.map((m) => m.user.zwiftId);

    // Метрики по райдерам команды.
    const riderMetrics = await this.getRiderMetrics(zwiftIds, teamMembersTotal);

    // Данные по заездам райдеров команды.
    const events = await this.events(urlSlug);

    return {
      data: { riderMetrics, events },
      message: `Данные статистики и метрики команды ${team.name}`,
    };
  }

  /**
   * Метрики по райдерам команды.
   */
  async getRiderMetrics(
    zwiftIds: number[],
    teamMembersTotal: number
  ): Promise<{
    totalMembers: number;
    categories: { [K in TZwiftCategory]: number };
    averageRacingScore: number;
    medals: {
      gold: number;
      silver: number;
      bronze: number;
    };
  }> {
    const riderParams = await this.riderRepository.getRidersParams(zwiftIds);

    const totalMembers = riderParams.length;

    const initialAccumulator = {
      categories: { A: 0, B: 0, C: 0, D: 0, E: 0 },
      racingScoreTotal: 0,
      medals: { gold: 0, silver: 0, bronze: 0 },
    };

    const { categories, racingScoreTotal, medals } = riderParams.reduce<
      typeof initialAccumulator
    >((acc, rider) => {
      if (!rider.competitionMetrics) {
        return acc;
      }

      const category = rider.competitionMetrics.category as TZwiftCategory;
      acc.categories[category]++;
      acc.racingScoreTotal += rider.competitionMetrics.racingScore;
      acc.medals.gold += rider.medals.gold;
      acc.medals.silver += rider.medals.silver;
      acc.medals.bronze += rider.medals.bronze;

      return acc;
    }, initialAccumulator);

    const averageRacingScore = racingScoreTotal / teamMembersTotal;

    return { totalMembers, categories, averageRacingScore, medals };
  }

  /**
   * Данные по заездам:
   * -всего заездов;
   * -заездов в этом сезоне;
   * -участники зарегистрированы в заезде.
   */
  async events(
    urlSlug: string
  ): Promise<{ totalResults: number; resultsInActiveSeason: number }> {
    const results = await this.resultRepository.getStatistics(urlSlug);

    const totalResults = results.length;

    const currentSeason = getSeasonPeriod(new Date());
    if (!currentSeason) {
      return { totalResults, resultsInActiveSeason: 0 };
    }

    const resultsInActiveSeason = results.reduce<number>((acc, result) => {
      const resultSeason = getSeasonPeriod(new Date(result.zwiftEventId.eventStart));
      if (currentSeason?.label === resultSeason?.label) {
        acc++;
      }
      return acc;
    }, 0);

    return { totalResults, resultsInActiveSeason };
  }
}
