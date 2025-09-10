import slugify from 'slugify';

import { TeamModel } from '../Model/Team.js';

// types
import { TTeam } from '../types/model.interface.js';
import { TCreateTeamParams } from '../types/team.types.js';

export class TeamService {
  constructor() {}

  /**
   * Получение данных команды с teamId.
   */
  async get(urlSlug: string): Promise<unknown> {
    const teamDB = await TeamModel.findOne({ urlSlug }).lean<TTeam>();

    if (!teamDB) {
      throw new Error(`Не найдена запрашиваемая команда с urlSlug: "${urlSlug}"!`);
    }

    return teamDB;
  }

  /**
   * Получение всех команд.
   */
  async getAll(): Promise<unknown> {
    const teamsDB = await TeamModel.find().lean<TTeam[]>();

    return teamsDB;
  }

  /**
   * Создание команды.
   */
  async create(team: TCreateTeamParams): Promise<unknown> {
    const isTeamNameExists = await this.isTeamNameExists(team.name);

    if (isTeamNameExists) {
      throw new Error(`Выбранное название команды: "${team.name}" уже существует `);
    }

    const urlSlug = this.createUrlSlug(team.name);

    await TeamModel.create({ ...team, urlSlug });

    return { message: 'Команда успешно создана.' };
  }

  // /**
  //  * Создание команды.
  //  */
  // async put({ creatorId }: { creatorId: string }): Promise<unknown> {}

  // /**
  //  * Удаление команды.
  //  */
  // async delete(): Promise<unknown> {}

  /**
   * Проверка уникальности urlSlug.
   */
  private async isTeamNameExists(name: string): Promise<boolean> {
    return Boolean(await TeamModel.exists({ name }));
  }

  private createUrlSlug(name: string): string {
    return slugify(name, {
      lower: true,
      strict: true,
    });
  }
}
