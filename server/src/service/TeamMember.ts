import { Types } from 'mongoose';

import { TeamMemberModel } from '../Model/TeamMember.js';
import { Rider } from '../Model/Rider.js';
import { teamMemberPublicDto } from '../dto/team-member.js';
import { ServiceMessage } from './ServiceMessage/ServiceMessage.js';
import { TeamServiceMessage } from './ServiceMessage/TeamServiceMessage.js';
import { TeamModel } from '../Model/Team.js';

// types
import { TTeamMembersPublicDB } from '../types/mongodb-response.types.js';
import { TControlMemberAction, TTeamMembersForDto, TTeamRole } from '../types/team.types.js';
import { RiderProfileSchema, TTeam } from '../types/model.interface.js';
import { TTeamMemberPublicDto } from '../types/dto.interface.js';

export class TeamMemberService {
  private teamServiceMessage: TeamServiceMessage;
  constructor() {
    this.teamServiceMessage = new TeamServiceMessage(new ServiceMessage());
  }

  /**
   * Получение данных всех участников команды.
   */
  async getAll(urlSlug: string): Promise<{ data: TTeamMemberPublicDto[]; message: string }> {
    const { _id } = await this.getTeamId(urlSlug);
    const teamMembersDB = await TeamMemberModel.find(
      { team: _id },
      { role: true, specialization: true, createdAt: true }
    )
      .populate({ path: 'user', select: ['zwiftId'] })
      .lean<TTeamMembersPublicDB[]>();

    const zwiftIds = teamMembersDB
      .map(({ user }) => user.zwiftId)
      .filter((item): item is number => !!item);

    const ridersDB = await Rider.find({ zwiftId: { $in: zwiftIds } }, { _id: false }).lean<
      RiderProfileSchema[]
    >();

    const teamMembers = teamMembersDB.reduce<TTeamMembersForDto[]>((acc, cur) => {
      const rider = ridersDB.find((r) => r.zwiftId === cur.user.zwiftId);

      acc.push({ ...cur, rider, userId: cur.user._id });
      return acc;
    }, []);

    const membersAfterDto = teamMembers.map((m) => teamMemberPublicDto(m));

    return { data: membersAfterDto, message: 'Участники команды' };
  }

  // async get(urlSlug: string): Promise<unknown> {
  // const teamDB = await TeamModel.findOne({ urlSlug }).lean<TTeam>();
  // if (!teamDB) {
  //   throw new Error(`Не найдена запрашиваемая команда с urlSlug: "${urlSlug}"!`);
  // }
  // return { data: teamDB };
  // }

  /**
   * Создание участника команды.
   */
  async create({
    userId,
    teamRole,
    teamId,
  }: {
    userId: string;
    teamId: string;
    teamRole?: TTeamRole;
  }): Promise<{ message: string }> {
    await TeamMemberModel.create({ user: userId, role: teamRole, team: teamId });

    return { message: 'Участник добавлен в команду' };
  }

  // private static ALL_MEMBERS_PUBLIC_PROJECTION: { a: true };

  private async getTeamId(urlSlug: string): Promise<{ _id: Types.ObjectId }> {
    const teamDB = await TeamModel.exists({ urlSlug });

    if (!teamDB) {
      throw new Error(`Не найдена команда с urlSlug:'${urlSlug}'`);
    }

    return teamDB;
  }

  /**
   * Управление участниками команды.
   */
  async controlMembers({
    teamCreatorId,
    teamMemberId,
    action,
  }: {
    teamCreatorId: string;
    teamMemberId: string;
    action: TControlMemberAction;
  }): Promise<{ message: string }> {
    let response = { message: 'start' };
    const teamDB = await TeamModel.findOne(
      { creator: teamCreatorId },
      { pendingRiders: true, bannedRiders: true }
    ).lean<Pick<TTeam, '_id' | 'pendingRiders' | 'bannedRiders'>>();

    if (!teamDB) {
      throw new Error(`Не найдена команда созданная пользователем с _id: "${teamCreatorId}"`);
    }

    if (action === 'approve') {
      response = await this.approveRequest({ team: teamDB, teamCreatorId, teamMemberId });
    } else if (action === 'cancel') {
      response = await this.removePendingUser({
        teamCreatorId,
        teamMemberId,
        isCanceledRequest: true,
      });
    } else if (action === 'exclude') {
      response = await this.delete({ teamCreatorId, teamMemberId });
    } else if (action === 'ban') {
      response = await this.banUser({ teamCreatorId, teamMemberId });
    } else if (action === 'cancelBan') {
      response = await this.cancelBan({ teamCreatorId, bannedUserId: teamMemberId });
    } else {
      throw new Error('Не получен валидный action для действий с участником команды!');
    }

    return response;
  }

  private async approveRequest({
    team,
    teamCreatorId,
    teamMemberId,
  }: {
    team: Pick<TTeam, '_id' | 'pendingRiders' | 'bannedRiders'>;
    teamCreatorId: string;
    teamMemberId: string;
  }): Promise<{ message: string }> {
    const candidate = team.pendingRiders.find((u) => u.user._id.equals(teamMemberId));

    if (!candidate) {
      throw new Error(
        `Не найдена заявка от пользователя _id: "${teamMemberId}" для присоединения к команде `
      );
    }

    // Удаление заявки от кандидата из массива заявок команды.
    await this.removePendingUser({ teamCreatorId, teamMemberId });

    // Создание участника команды.
    const response = await this.create({
      userId: teamMemberId,
      teamId: team._id.toString(),
    });

    // Создание сервисного сообщения.
    await this.teamServiceMessage.requestApproved({
      candidateId: teamMemberId,
      teamId: team._id.toString(),
    });

    // Создание сервисных сообщений для всех участников.
    await this.teamServiceMessage.newMemberJoined({
      candidateId: teamMemberId,
      teamId: team._id.toString(),
    });

    return response;
  }

  /**
   * Снятие блокировки с участника.
   */
  private async cancelBan({
    teamCreatorId,
    bannedUserId,
  }: {
    teamCreatorId: string;
    bannedUserId: string;
  }): Promise<{ message: string }> {
    await TeamModel.findOneAndUpdate(
      { creator: teamCreatorId },
      { $pull: { bannedRiders: { user: bannedUserId } } }
    );

    return { message: 'С пользователя снята блокировка.' };
  }

  /**
   * Блокировка пользователя.
   */
  private async banUser({
    teamCreatorId,
    teamMemberId,
  }: {
    teamCreatorId: string;
    teamMemberId: string;
  }): Promise<{ message: string }> {
    if (teamCreatorId === teamMemberId) {
      throw new Error('Невозможно заблокировать создателя команды!');
    }

    const teamDB = await TeamModel.findOneAndUpdate(
      { creator: teamCreatorId },
      { $push: { bannedRiders: { user: teamMemberId } } }
    );

    if (!teamDB) {
      throw new Error(`Не найдена команда созданная пользователем с _id: "${teamCreatorId}"`);
    }

    // Если была заявка на вступление, удаление заявки.
    await this.removePendingUser({
      teamCreatorId,
      teamMemberId,
    });

    // Удаление участника из команды, если он там состоял.
    const isExistedUser = await TeamMemberModel.exists({ user: teamMemberId });
    if (isExistedUser) {
      await this.delete({
        teamCreatorId,
        teamMemberId,
      });
    }

    return { message: 'Участник заблокирован в команде.' };
  }

  /**
   * Исключение пользователя из команды.
   */
  private async delete({
    teamCreatorId,
    teamMemberId,
  }: {
    teamCreatorId: string;
    teamMemberId: string;
  }): Promise<{ message: string }> {
    if (teamCreatorId === teamMemberId) {
      throw new Error('Невозможно удалить создателя команды!');
    }

    const memberDB = await TeamMemberModel.findOneAndDelete({ user: teamMemberId });
    // FIXME: добавить userId в запрос на участников команды
    if (!memberDB) {
      throw new Error(
        `Не найден пользователь с _id:"${teamMemberId}" для исключения из команды!`
      );
    }

    // Создание сервисного сообщения для создателя команды.
    await this.teamServiceMessage.youKickedMember({
      userId: memberDB.user.toString(),
      teamId: memberDB.team.toString(),
    });

    // Создание сервисного сообщения для бывшего участника команды.
    await this.teamServiceMessage.youWereKicked({
      userId: memberDB.user.toString(),
      teamId: memberDB.team.toString(),
    });

    return { message: 'Участник исключен из команды.' };
  }

  /**
   * Выход участника из команды.
   */
  async leave({
    urlSlug,
    teamMemberId,
  }: {
    urlSlug: string;
    teamMemberId: string;
  }): Promise<{ message: string }> {
    const teamDB = await TeamModel.findOne({ urlSlug }, { name: true, creator: true }).lean<{
      _id: Types.ObjectId;
      creator: Types.ObjectId;
      name: string;
    }>();

    if (!teamDB) {
      throw new Error(`Не найдена команда с urlSlug:"${urlSlug}"!`);
    }

    // Если состоит, то проверка не является ли он создателем данной команды.
    if (teamDB.creator.equals(teamMemberId)) {
      throw new Error('Невозможно выйти создателю команды из команды!');
    }

    const res = await TeamMemberModel.findOneAndDelete({
      user: teamMemberId,
      team: teamDB._id,
    });

    if (!res) {
      throw new Error(`Вы не числитесь в составе команды "${teamDB.name}"`);
    }

    // Создание сервисного сообщения.
    await this.teamServiceMessage.memberLeft({
      teamMemberId,
      teamId: teamDB._id.toString(),
    });

    return { message: `Вы покинули команду "${teamDB.name}"` };
  }

  /**
   * Удаление заявки от кандидата из массива заявок команды.
   */
  private async removePendingUser({
    teamCreatorId,
    teamMemberId,
    isCanceledRequest = false,
  }: {
    teamCreatorId: string;
    teamMemberId: string;
    isCanceledRequest?: boolean; // Используется как отказ на вступление кандидата в команду.
  }): Promise<{ message: string }> {
    const teamDB = await TeamModel.findOneAndUpdate(
      { creator: teamCreatorId },
      { $pull: { pendingRiders: { user: teamMemberId } } }
    ).lean();

    if (!teamDB) {
      throw new Error(`Не найдена команда созданная пользователем с _id: "${teamCreatorId}"`);
    }

    if (isCanceledRequest) {
      // Создание сервисного сообщения о заявки.
      await this.teamServiceMessage.requestRejected({
        candidateId: teamMemberId,
        teamId: teamDB._id.toString(),
      });
    }

    return { message: 'Заявка на присоединение к команде удалена из списка.' };
  }
}
