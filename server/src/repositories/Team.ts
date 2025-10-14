import { TeamModel } from '../Model/Team.js';
import { TTeam } from '../types/model.interface.js';

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
}
