import { RiderRepository } from '../repositories/Rider';
import { TeamMemberRepository } from '../repositories/TeamMember';

// types
import { TZwiftCategory } from '../types/types.interface';

type getRes = {
  categories: { [K in TZwiftCategory]: number };
  averageRacingScore: number;
  medals: {
    gold: number;
    silver: number;
    bronze: number;
  };
};

export class TeamStatisticsService {
  private teamMemberRepository: TeamMemberRepository;
  private riderRepository: RiderRepository;
  constructor() {
    this.teamMemberRepository = new TeamMemberRepository();
    this.riderRepository = new RiderRepository();
  }

  /**
   * Статистические данные команды.
   */
  public async get(teamId: string): Promise<getRes | null> {
    const teamMembers = await this.teamMemberRepository.getTeamMemberData(teamId);

    const teamMembersTotal = teamMembers.length;
    if (teamMembersTotal === 0) {
      return null;
    }

    const zwiftIds = teamMembers.map((m) => m.user.zwiftId);

    const { categories, averageRacingScore, medals } = await this.riderMetrics(
      zwiftIds,
      teamMembersTotal
    );

    console.log({ categories, averageRacingScore, medals });

    return { categories, averageRacingScore, medals };
  }

  /**
   * Метрики по райдерам команды.
   */
  async riderMetrics(
    zwiftIds: number[],
    teamMembersTotal: number
  ): Promise<{
    categories: { [K in TZwiftCategory]: number };
    averageRacingScore: number;
    medals: {
      gold: number;
      silver: number;
      bronze: number;
    };
  }> {
    const ridersParams = await this.riderRepository.getRidersParams(zwiftIds);

    const initialAccumulator = {
      categories: { A: 0, B: 0, C: 0, D: 0, E: 0 },
      racingScoreTotal: 0,
      medals: { gold: 0, silver: 0, bronze: 0 },
    };

    const { categories, racingScoreTotal, medals } = ridersParams.reduce<
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

    return { categories, averageRacingScore, medals };
  }

  /**
   * Данные по заездам:
   * -всего заездов;
   * -заездов в этом сезоне;
   * -участники зарегистрированны в заезде.
   */
  async events(): Promise<unknown> {
    return null;
  }
}
