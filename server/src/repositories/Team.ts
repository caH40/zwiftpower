import { TeamModel } from '../Model/Team.js';

// types
import { TTeam } from '../types/model.interface.js';
import { TTeamAppearance } from '../types/team.types.js';

export class TeamRepository {
  constructor() {}

  /**
   * Данные команды.
   */
  async getById(teamId: string): Promise<TTeam | null> {
    return TeamModel.findById(teamId).lean();
  }

  /**
   * данные по appearance у всех команд.
   */
  async getTeamsAppearance(): Promise<{ urlSlug: string; appearance?: TTeamAppearance }[]> {
    return await TeamModel.find({}, { _id: 0, urlSlug: 1, appearance: 1 }).lean();
  }

  /**
   * Возвращает команду по slug.
   */
  async getByUrlSlug(urlSlug: string): Promise<TTeam | null> {
    return this.getByUrlSlugAndProjection(urlSlug);
  }
  /**
   * Возвращает имя команды по slug.
   */
  async getNameByUrlSlug(urlSlug: string): Promise<{ name: string } | null> {
    return this.getByUrlSlugAndProjection(urlSlug, { name: 1 });
  }

  /**
   * Возвращает команду по slug.
   * Если указана проекция, возвращает только выбранные поля.
   */
  private async getByUrlSlugAndProjection<K extends keyof TTeam>(
    urlSlug: string,
    paramsProjection?: Record<K, 1 | 0>
  ): Promise<Pick<TTeam, K> | null> {
    const projection = paramsProjection ? { _id: 0, ...paramsProjection } : undefined;

    return TeamModel.findOne({ urlSlug }, projection).lean();
  }
}
