import slugify from 'slugify';

import { TeamModel } from '../Model/Team.js';
import { TeamMemberService } from './TeamMember.js';
import { ImagesService } from './Images.js';
import { teamForListDto, teamPublicDto } from '../dto/teams.js';
import { TeamMemberModel } from '../Model/TeamMember.js';

// types
import { TCreateTeamParams } from '../types/team.types.js';
import { TTeamForListDB, TTeamPublicDB } from '../types/mongodb-response.types.js';
import mongoose from 'mongoose';

export class TeamService {
  constructor() {}

  /**
   * Получение данных команды с teamId.
   */
  async get(urlSlug: string): Promise<unknown> {
    const teamDB = await TeamModel.findOne(
      { urlSlug },
      TeamService.ALL_TEAM_PUBLIC_PROJECTION
    ).lean<TTeamPublicDB>();

    if (!teamDB) {
      throw new Error(`Не найдена запрашиваемая команда с urlSlug: "${urlSlug}"!`);
    }

    return { data: teamPublicDto(teamDB) };
  }

  /**
   * Получение всех команд.
   */
  async getAll(): Promise<unknown> {
    const teamsDB = await TeamModel.find({}, TeamService.ALL_TEAMS_FOR_LIST_PROJECTION).lean<
      TTeamForListDB[]
    >();

    const teams = teamsDB.map((team) => teamForListDto(team));

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
      throw new Error(`Выбранное название команды: "${team.name}" уже существует!`);
    }
    const alreadyHasTeam = await this.alreadyHasTeam(team.creator);

    if (alreadyHasTeam) {
      throw new Error(
        `Вы уже состоите в команде. Создать новую команду можно только если вы не участник другой команды.`
      );
    }
    const hasPendingRequest = await this.hasPendingRequest(team.creator);

    if (hasPendingRequest) {
      throw new Error(
        `Вы сделали запрос на присоединение к другой команде. Создать новую команду можно только если вы не участник другой команды.`
      );
    }

    const urlSlug = this.createUrlSlug(team.name);

    // Создание название файла для изображения и сохранение файла в объектом хранилище Облака.
    const { logoFileInfo, posterFileInfo } = await ImagesService.save({
      name: team.name,
      shortName: team.shortName,
      logoFile,
      posterFile,
    });

    const createdTeam = await TeamModel.create({
      ...team,
      logoFileInfo,
      posterFileInfo,
      urlSlug,
    });

    await this.addFounderToTeam(team.creator, createdTeam._id.toString());

    return { message: 'Команда успешно создана.' };
  }

  /**
   * Обработчик заявки на вступление.
   */
  async handleJoinRequest({
    candidateId,
    urlSlug,
  }: {
    candidateId: string;
    urlSlug: string;
  }): Promise<unknown> {
    // Находим команду.
    const teamDB = await TeamModel.findOne({ urlSlug });

    if (!teamDB) {
      throw new Error(`Не найдена команда с urlSlug: "${urlSlug}"`);
    }

    // Проверяем, есть ли уже заявка или участник.
    const alreadyPending = teamDB.pendingRiders.some((rider) => rider.user.equals(candidateId));
    if (alreadyPending) {
      throw new Error('Заявка уже отправлена и ожидает подтверждения.');
    }

    const alreadyMember = await TeamMemberModel.exists({ user: candidateId });
    if (alreadyMember) {
      throw new Error(
        'Вы уже состоите в другой команде. Допускается быть только в одной команде.'
      );
    }

    // 3️⃣ Добавляем заявку.
    teamDB.pendingRiders.push({
      user: new mongoose.Types.ObjectId(candidateId),
      requestedAt: new Date(),
    });
    await teamDB.save();

    return {
      message: 'Ваша заявка на вступление отправлена. Ожидайте подтверждения капитана команды.',
    };
  }

  // /**
  //  * Обновление данных команды.
  //  */
  // async put({ creatorId }: { creatorId: string }): Promise<unknown> {}

  // /**
  //  * Удаление команды.
  //  */
  // async delete(): Promise<unknown> {}

  /**
   * Добавление создателя команды в команду.
   */
  private async addFounderToTeam(creatorId: string, teamId: string): Promise<void> {
    const teamMember = new TeamMemberService();

    await teamMember.create({ userId: creatorId, teamRole: 'Founder', teamId });
  }

  /**
   * Проверка уникальности urlSlug.
   */
  private async isTeamNameExists(name: string): Promise<boolean> {
    return Boolean(await TeamModel.exists({ name }));
  }

  /**
   * Проверка есть ли в списке на присоединение к какой либо команде.
   */
  private async hasPendingRequest(userId: string): Promise<boolean> {
    return Boolean(await TeamModel.findOne({ 'pendingRiders.user': userId }));
  }

  /**
   * Проверка что пользователь не является создателем или членом команды.
   */
  private async alreadyHasTeam(creatorId: string): Promise<boolean> {
    const team = Boolean(await TeamModel.exists({ creator: creatorId }));
    const teamMember = Boolean(await TeamMemberModel.exists({ user: creatorId }));

    return team || teamMember;
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
    logoFileInfo: true,
    posterFileInfo: true,
  };

  private static ALL_TEAM_PUBLIC_PROJECTION = {
    creator: false,
    pendingRiders: false,
    bannedRiders: false,
    createdAt: false,
    updatedAt: false,
  };
}
