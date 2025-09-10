import slugify from 'slugify';

import { TeamModel } from '../Model/Team.js';

// types
import { TTeam } from '../types/model.interface.js';
import { TCreateTeamParams } from '../types/team.types.js';
import { ImagesService } from './Images.js';
import { TTeamForListDB } from '../types/mongodb-response.types.js';
import { dtoTeamForList } from '../dto/teams.js';

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

    return { data: teamDB };
  }

  /**
   * Получение всех команд.
   */
  async getAll(): Promise<unknown> {
    const teamsDB = await TeamModel.find({}, TeamService.ALL_TEAMS_FOR_LIST_PROJECTION).lean<
      TTeamForListDB[]
    >();

    const teams = teamsDB.map((team) => dtoTeamForList(team));

    return { data: teams, message: 'Список команд' };
  }

  /**
   * Создание команды.
   */
  async create({
    team,
    logoFile,
    posterFile,
  }: {
    team: TCreateTeamParams;
    logoFile?: Express.Multer.File;
    posterFile?: Express.Multer.File;
  }): Promise<{ message: string }> {
    const isTeamNameExists = await this.isTeamNameExists(team.name);

    if (isTeamNameExists) {
      throw new Error(`Выбранное название команды: "${team.name}" уже существует `);
    }

    const urlSlug = this.createUrlSlug(team.name);

    // Создание название файла для изображения и сохранение файла в объектом хранилище Облака.
    const { logoFileInfo, posterFileInfo } = await ImagesService.save({
      name: team.name,
      shortName: team.shortName,
      logoFile,
      posterFile,
    });

    await TeamModel.create({ ...team, logoFileInfo, posterFileInfo, urlSlug });

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

  private static ALL_TEAMS_FOR_LIST_PROJECTION = {
    name: true,
    shortName: true,
    urlSlug: true,
    mission: true,
    description: true,
    logoFileInfo: true,
    posterFileInfo: true,
  };
}
