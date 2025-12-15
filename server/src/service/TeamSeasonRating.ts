import { TeamSeasonRatingRepository } from '../repositories/TeamSeasonRating.js';
import { TTeamSeasonRating } from '../types/model.interface.js';

export class TeamSeasonRatingService {
  private ratingRepository: TeamSeasonRatingRepository = new TeamSeasonRatingRepository();

  /**
   * Таблица рейтинга всех команд
   */
  getAll = async (
    seasonLabel: string
  ): Promise<
    Promise<(Omit<TTeamSeasonRating, 'eventsIds' | 'team'> & { team: { urlSlug: string } })[]>
  > => {
    const rating = await this.ratingRepository.getAll(seasonLabel);

    return rating;
  };
}
