import { EventResultRepository } from '../repositories/EventResult.js';
import { RiderRepository } from '../repositories/Rider.js';
import { TeamRepository } from '../repositories/Team.js';
import { TeamMemberRepository } from '../repositories/TeamMember.js';
import { getSeasonPeriod } from '../utils/season.js';

// types
import { TZwiftCategory } from '../types/types.interface.js';
import { TResponseService } from '../types/http.interface.js';
import { TStatistics } from '../types/team.types.js';
import { SignedRidersRepository } from '../repositories/SignedRiders.js';
import { EventRepository } from '../repositories/Event.js';

export class TeamStatisticsService {
  private teamMemberRepository: TeamMemberRepository;
  private riderRepository: RiderRepository;
  private resultRepository: EventResultRepository;
  private teamRepository: TeamRepository;
  private signedRidersRepository: SignedRidersRepository;
  private eventRepository: EventRepository;
  constructor() {
    this.teamMemberRepository = new TeamMemberRepository();
    this.riderRepository = new RiderRepository();
    this.riderRepository = new RiderRepository();
    this.resultRepository = new EventResultRepository();
    this.teamRepository = new TeamRepository();
    this.signedRidersRepository = new SignedRidersRepository();
    this.eventRepository = new EventRepository();
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

    const registeredEventsCount = await this.getRegisteredEventsCount(team._id.toString());

    return {
      data: { riderMetrics, events, registeredEventsCount },
      message: `Данные статистики и метрики команды ${team.name}`,
    };
  }

  /**
   * Метрики по райдерам команды.
   */
  private async getRiderMetrics(
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
  private async events(
    urlSlug: string
  ): Promise<{ totalResults: number; resultsInActiveSeason: number }> {
    // Общее количество результатов всех участников команды.
    const results = await this.resultRepository.getStatistics(urlSlug);

    const uniqueEventsMap: Map<string, string> = new Map();

    results.forEach((r) =>
      uniqueEventsMap.set(r.zwiftEventId._id.toString(), r.zwiftEventId.eventStart)
    );

    const totalResults = uniqueEventsMap.size;

    const currentSeason = getSeasonPeriod(new Date());
    if (!currentSeason) {
      return { totalResults, resultsInActiveSeason: 0 };
    }

    let resultsInActiveSeason = 0;

    for (const eventStart of uniqueEventsMap.values()) {
      const resultSeason = getSeasonPeriod(new Date(eventStart));
      if (currentSeason?.label === resultSeason?.label) {
        resultsInActiveSeason++;
      }
    }

    return { totalResults, resultsInActiveSeason };
  }

  /**
   * Количество заездов в которых зарегистрированы участники команды.
   */
  private async getRegisteredEventsCount(teamId: string): Promise<number> {
    const subgroups = await this.signedRidersRepository.getSubgroupForTeamMembers(teamId);
    const subgroupIds = subgroups.map(({ subgroup }) => subgroup);

    const events = await this.eventRepository.getEventIds(subgroupIds);

    const now = new Date();

    // Эвенты которые еще не стартовали.
    const actualEvents = events.filter((e) => new Date(e.eventStart) > now);

    return actualEvents.length;
  }
}
