import { EventResultRepository } from '../repositories/EventResult.js';
import { TeamRepository } from '../repositories/Team.js';
import { TeamMemberRepository } from '../repositories/TeamMember.js';
import { TeamSeasonRatingService } from './TeamSeasonRating.js';

// types
import { TTeamParticipantRatingResult } from '../types/dto.interface.js';
import { parseSeasonLabel } from '../utils/season.js';
import { TeamSeasonRatingRepository } from '../repositories/TeamSeasonRating.js';

/**
 * Класс формирования таблицы результатов участников команды за выбранный сезон, результаты
 * которых учитываются в рейтинге среди команд.
 */
export class TeamParticipantRatingResult {
  private teamRepository: TeamRepository = new TeamRepository();
  private eventResultRepository: EventResultRepository = new EventResultRepository();
  private memberRepository: TeamMemberRepository = new TeamMemberRepository();
  private teamSeasonRatingService: TeamSeasonRatingService = new TeamSeasonRatingService();
  private ratingRepository: TeamSeasonRatingRepository = new TeamSeasonRatingRepository();

  constructor() {}

  /**
   * Формирование таблицы результатов участников команды за выбранный сезон, результаты
   * которых учитываются в рейтинге среди команд.
   * 1. Получить эвенты, результаты которых учитывались в рейтинге;
   * 2. Получить соответствующие результаты эвентов. Определять результаты стандартные или результаты этапов;
   * 3. Сформировать таблицу с сортировкой от более новых к более старым результатам;
   */
  getTeamAllResults = async ({
    seasonLabel,
    teamId,
  }: {
    seasonLabel: string;
    teamId: string;
  }): Promise<TResponseService<TTeamParticipantRatingResult[]>> => {
    console.log({
      seasonLabel,
      teamId,
    });

    const dates = parseSeasonLabel(seasonLabel);

    if (!dates) {
      throw new Error(`Не корректное название сезона: ${seasonLabel}`);
    }

    const resultEvents = await this.ratingRepository.getResultEvents({ seasonLabel, teamId });

    console.log(resultEvents);

    return {
      data: null,
      message: `Рейтинговые результаты участников команды за сезон ${seasonLabel}`,
    };
  };
}
