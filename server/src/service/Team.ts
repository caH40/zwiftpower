import mongoose, { Types } from 'mongoose';
import slugify from 'slugify';

import { TeamModel } from '../Model/Team.js';
import { Rider } from '../Model/Rider.js';
import { TeamMemberService } from './TeamMember.js';
import { ImagesService } from './Images.js';
import {
  bannedRiderDto,
  pendingRiderDto,
  teamForListDto,
  teamPublicDto,
} from '../dto/teams.js';
import { TeamMemberModel } from '../Model/TeamMember.js';
import { User } from '../Model/User.js';

// types
import { TCreateTeamParams } from '../types/team.types.js';
import { TTeamForListDB, TTeamPublicDB } from '../types/mongodb-response.types.js';
import { RiderProfileSchema, TTeam } from '../types/model.interface.js';
import { TBannedRiderDto, TPendingRiderDto } from '../types/dto.interface.js';
import { FilterQuery } from 'mongoose';

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
    const isTeamShortNameExists = await this.isTeamShortNameExists(team.shortName);

    if (isTeamShortNameExists) {
      throw new Error(
        `Выбранное короткое название команды: "${team.shortName}" уже существует!`
      );
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
  }): Promise<{ message: string }> {
    // Находим команду.
    const teamDB = await TeamModel.findOne({ urlSlug });

    if (!teamDB) {
      throw new Error(`Не найдена команда с urlSlug: "${urlSlug}"`);
    }

    // Проверяем, не забанен ли участник в данном клубе.
    const isBannedCandidate = teamDB.bannedRiders.some((rider) =>
      rider.user.equals(candidateId)
    );
    if (isBannedCandidate) {
      throw new Error('К сожалению, вы не можете присоединиться к этой команде.');
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

    const hasLinkedZwiftId = await this.hasLinkedZwiftId(candidateId);

    if (!hasLinkedZwiftId) {
      throw new Error(
        'Для вступления в команду необходимо привязать ZwiftId к вашему аккаунту в Личном кабинете!'
      );
    }

    // Добавляем заявку.
    teamDB.pendingRiders.push({
      user: new mongoose.Types.ObjectId(candidateId),
      requestedAt: new Date(),
    });
    await teamDB.save();

    return {
      message: 'Ваша заявка на вступление отправлена. Ожидайте подтверждения капитана команды.',
    };
  }

  /**
   * Получение списка пользователей, которые подали заявку на вступление в команду.
   */
  async getPendingRiders(
    teamCreatorId: string
  ): Promise<{ data: TPendingRiderDto[]; message: string }> {
    const teamDB = await TeamModel.findOne(
      { creator: teamCreatorId },
      { _id: false, pendingRiders: true, name: true }
    )
      .populate({ path: 'pendingRiders.user', select: ['zwiftId'] })
      .lean<
        Pick<TTeam, 'name'> & {
          pendingRiders: {
            user: { zwiftId?: number; _id: Types.ObjectId };
            requestedAt: Date;
          }[];
        }
      >();

    if (!teamDB) {
      throw new Error(`Не найдена команда созданная пользователем с _id: "${teamCreatorId}"`);
    }

    const zwiftIds = teamDB.pendingRiders
      .map(({ user }) => user.zwiftId)
      .filter((item): item is number => !!item);

    // Данные райдеров.
    const ridersDB = await Rider.find({ zwiftId: { $in: zwiftIds } }).lean<
      (RiderProfileSchema & { _id: Types.ObjectId })[]
    >();

    // Добавление времени подачи заявки каждым райдером.
    const riders = ridersDB.reduce<
      (RiderProfileSchema & {
        _id: Types.ObjectId;
        userId: Types.ObjectId;
        requestedAt: Date;
      })[]
    >((acc, cur) => {
      const pendingRider = teamDB.pendingRiders.find((p) => {
        return p.user.zwiftId === cur.zwiftId;
      });

      if (pendingRider) {
        acc.push({
          ...cur,
          requestedAt: pendingRider.requestedAt,
          userId: pendingRider.user._id,
        });
      }

      return acc;
    }, []);

    const pendingRiderAfterDto = riders.map((r) => pendingRiderDto(r));

    return {
      data: pendingRiderAfterDto,
      message: `Список райдеров, подавших заявки на вступление в команду "${teamDB?.name}"`,
    };
  }

  async getBannedUsers(
    teamCreatorId: string
  ): Promise<{ data: TBannedRiderDto[]; message: string }> {
    const teamDB = await TeamModel.findOne(
      { creator: teamCreatorId },
      { _id: false, bannedRiders: true, name: true }
    )
      .populate({ path: 'bannedRiders.user', select: ['zwiftId'] })
      .lean<
        Pick<TTeam, 'name'> & {
          bannedRiders: {
            user: { zwiftId?: number; _id: Types.ObjectId };
            bannedAt: Date;
            reason?: string;
          }[];
        }
      >();

    if (!teamDB) {
      throw new Error(`Не найдена команда созданная пользователем с _id: "${teamCreatorId}"`);
    }

    const zwiftIds = teamDB.bannedRiders
      .map(({ user }) => user.zwiftId)
      .filter((item): item is number => !!item);

    // Данные райдеров.
    const ridersDB = await Rider.find({ zwiftId: { $in: zwiftIds } }).lean<
      (RiderProfileSchema & { _id: Types.ObjectId })[]
    >();

    // Добавление времени подачи заявки каждым райдером.
    const riders = ridersDB.reduce<
      (RiderProfileSchema & {
        _id: Types.ObjectId;
        userId: Types.ObjectId;
        bannedAt: Date;
        bannedReason?: string;
      })[]
    >((acc, cur) => {
      const bannedUser = teamDB.bannedRiders.find((p) => {
        return p.user.zwiftId === cur.zwiftId;
      });

      if (bannedUser) {
        acc.push({
          ...cur,
          bannedAt: bannedUser.bannedAt,
          bannedReason: bannedUser.reason,
          userId: bannedUser.user._id,
        });
      }

      return acc;
    }, []);

    const bannedRiderAfterDto = riders.map((r) => bannedRiderDto(r));

    return {
      data: bannedRiderAfterDto,
      message: 'Список заблокированных пользователей.',
    };
  }

  /**
   * Проверка привязал ли пользователь к своему аккаунту zwiftId.
   */
  private async hasLinkedZwiftId(userId: string): Promise<boolean> {
    const userDB = await User.findOne({ _id: userId }, { _id: false, zwiftId: true }).lean<{
      zwiftId?: number;
    }>();

    return !!userDB?.zwiftId;
  }

  /**
   * Обновление данных команды.
   */
  async put({
    team,
    logoFile,
    posterFile,
  }: {
    team: TCreateTeamParams & { _id: string };
    logoFile?: Express.Multer.File;
    posterFile?: Express.Multer.File;
  }): Promise<unknown> {
    const teamDB = await TeamModel.findOne({ _id: team._id, creator: team.creator });

    if (!teamDB) {
      throw new Error(
        `Не найден изменяемая команда с _id: "${team._id}" и создателем creator: "${team.creator}"`
      );
    }

    await this.assertTeamFieldUnique('name', team.name, team._id);
    await this.assertTeamFieldUnique('shortName', team.shortName, team._id);

    // Создание название файла для изображения и сохранение файла в объектом хранилище Облака.
    const { logoFileInfo, posterFileInfo } = await ImagesService.save({
      name: team.name,
      shortName: team.shortName,
      baseNameLogoOld: teamDB.logoFileInfo?.baseName,
      baseNamePosterOld: teamDB.posterFileInfo?.baseName,
      logoFile,
      posterFile,
    });

    // Итоговые данные для сохранения в БД.
    const updateFields = {
      name: team.name,
      shortName: team.shortName,
      mission: team.mission,
      description: team.description,
      ...(logoFileInfo && { logoFileInfo }),
      ...(posterFileInfo && { posterFileInfo }),
    };

    Object.assign(teamDB, updateFields);

    // Сохранение Серии в БД.
    await teamDB.save();

    return { data: null, message: `Обновлены данные Команды "${team.name}"!` };
  }

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
   * Проверка уникальности Name или shortName.
   * Если передан exceptTeamId, то исключить команду с _id:exceptTeamId
   */
  private async assertTeamFieldUnique(
    field: 'name' | 'shortName',
    value: string,
    exceptTeamId?: string
  ): Promise<void> {
    const query: FilterQuery<typeof TeamModel> = { [field]: value };

    if (exceptTeamId) {
      query._id = { $ne: exceptTeamId };
    }

    const exists = await TeamModel.exists(query).collation({ locale: 'en', strength: 2 });

    if (exists) {
      throw new Error(
        `Выбранное ${
          field === 'name' ? 'название' : 'короткое название'
        } команды: "${value}" уже существует!`
      );
    }
  }

  /**
   * Проверка уникальности Name и следовательно urlSlug.
   * Если передан exceptTeamId, то исключить команду с _id:exceptTeamId
   */
  private async isTeamNameExists(name: string, exceptTeamId?: string): Promise<boolean> {
    const query: { name: string; _id?: { $ne: string } } = { name };

    if (exceptTeamId) {
      query._id = { $ne: exceptTeamId };
    }

    return Boolean(await TeamModel.exists(query).collation({ locale: 'en', strength: 2 }));
  }

  /**
   * Проверка уникальности Name и следовательно urlSlug.
   */
  private async isTeamShortNameExists(
    shortName: string,
    exceptTeamId?: string
  ): Promise<boolean> {
    const query: { shortName: string; _id?: { $ne: string } } = { shortName };

    if (exceptTeamId) {
      query._id = { $ne: exceptTeamId };
    }

    return Boolean(await TeamModel.exists(query).collation({ locale: 'en', strength: 2 }));
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
