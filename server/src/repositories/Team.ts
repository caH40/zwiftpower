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
    return await TeamModel.findById(teamId).lean();
  }

  /**
   * Данные команды.
   */
  async getByUrlSlug(urlSlug: string): Promise<TTeam | null> {
    return await TeamModel.findOne({ urlSlug }).lean();
  }

  /**
   * данные по appearance у всех команд.
   */
  async getTeamsAppearance(): Promise<{ urlSlug: string; appearance?: TTeamAppearance }[]> {
    return await TeamModel.find({}, { _id: 0, urlSlug: 1, appearance: 1 }).lean();
  }
}
