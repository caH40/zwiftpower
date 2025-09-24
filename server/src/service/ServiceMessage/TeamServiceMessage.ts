import { Types } from 'mongoose';

import { TeamModel } from '../../Model/Team.js';
import { User } from '../../Model/User.js';
import { server } from '../../config/environment.js';
import { teamMessageTemplates } from '../../assets/service-message.js';
import { Rider } from '../../Model/Rider.js';
import { handleAndLogError } from '../../errors/error.js';

// types
import {
  TCreateMethodServiceMessageParams,
  TServiceMessageType,
} from '../../types/service-message.types.js';
import { TeamMemberModel } from '../../Model/TeamMember.js';

interface IServiceMessage {
  create(params: TCreateMethodServiceMessageParams): Promise<void>;
  createMany(params: TCreateMethodServiceMessageParams[]): Promise<void>;
}

/**
 * Класс сервисные сообщения на сайте.
 */
export class TeamServiceMessage {
  private serviceMessage: IServiceMessage;
  private readonly type: TServiceMessageType;

  constructor(serviceMessage: IServiceMessage) {
    this.serviceMessage = serviceMessage;
    this.type = 'team';
  }

  async joinRequest({
    candidateId,
    teamId,
  }: {
    candidateId: string;
    teamId: string;
  }): Promise<{ data: null; message: string }> {
    try {
      const [user, team] = await Promise.all([this.getUser(candidateId), this.getTeam(teamId)]);

      const url = `${server}/teams/${team.urlSlug}/control/members`;
      const { text, title } = teamMessageTemplates.joinRequest({
        applicantName: user.name,
        teamName: team.name,
      });

      await this.serviceMessage.create({
        recipientUser: team.creator,
        initiatorUser: candidateId,
        type: this.type,
        text,
        url,
        title,
      });

      return { data: null, message: 'Создано сервисное сообщение' };
    } catch (error) {
      handleAndLogError(error);
      return { data: null, message: 'Ошибка при создании сервисного сообщения' };
    }
  }

  /**
   * Сервисное сообщение о одобрении заявки на вступление в команду.
   * @param candidateId - id пользователя которому одобрили заявку и которому предназначается сообщение
   * @param teamId
   * @returns
   */
  async requestApproved({
    candidateId,
    teamId,
  }: {
    candidateId: string;
    teamId: string;
  }): Promise<{ data: null; message: string }> {
    try {
      const team = await this.getTeam(teamId);

      const url = `${server}/teams/${team.urlSlug}/members`;
      const { text, title } = teamMessageTemplates.requestApproved({
        teamName: team.name,
      });

      await this.serviceMessage.create({
        recipientUser: candidateId,
        initiatorUser: team.creator,
        type: this.type,
        text,
        url,
        title,
      });

      return { data: null, message: 'Создано сервисное сообщение' };
    } catch (error) {
      handleAndLogError(error);
      return { data: null, message: 'Ошибка при создании сервисного сообщения' };
    }
  }

  /**
   * Сервисное сообщение об отклонении заявки на вступление в команду.
   * @returns
   */
  async requestRejected({
    candidateId,
    teamId,
  }: {
    candidateId: string;
    teamId: string;
  }): Promise<{ data: null; message: string }> {
    try {
      const team = await this.getTeam(teamId);

      const { text, title } = teamMessageTemplates.requestRejected({
        teamName: team.name,
      });

      const url = `${server}/teams/${team.urlSlug}/members`;

      await this.serviceMessage.create({
        recipientUser: candidateId,
        initiatorUser: team.creator,
        type: this.type,
        text,
        url,
        title,
      });

      return { data: null, message: 'Создано сервисное сообщение' };
    } catch (error) {
      handleAndLogError(error);
      return { data: null, message: 'Ошибка при создании сервисного сообщения' };
    }
  }

  /**
   * Сервисное сообщение об выходе участника из команды.
   * @returns
   */
  async memberLeft({
    teamMemberId,
    teamId,
  }: {
    teamMemberId: string;
    teamId: string;
  }): Promise<{ data: null; message: string }> {
    try {
      const [user, team] = await Promise.all([
        this.getUser(teamMemberId),
        this.getTeam(teamId),
      ]);

      const { text, title } = teamMessageTemplates.memberLeft({
        memberName: user.name,
        teamName: team.name,
      });

      // Страница пользователя, который вышел из состава из команды.
      const url = `${server}/profile/${user.zwiftId}/results`;

      await this.serviceMessage.create({
        recipientUser: team.creator,
        initiatorUser: teamMemberId,
        type: this.type,
        text,
        url,
        title,
      });

      return { data: null, message: 'Создано сервисное сообщение' };
    } catch (error) {
      handleAndLogError(error);
      return { data: null, message: 'Ошибка при создании сервисного сообщения' };
    }
  }

  /**
   * Сервисное сообщение об исключении участника из команды.
   * @returns
   */
  async youKickedMember({
    userId,
    teamId,
  }: {
    userId: string;
    teamId: string;
  }): Promise<{ data: null; message: string }> {
    try {
      const [user, team] = await Promise.all([this.getUser(userId), this.getTeam(teamId)]);

      const { text, title } = teamMessageTemplates.youKickedMember({
        memberName: user.name,
        teamName: team.name,
      });

      // Страница пользователя, исключенного из команды.
      const url = `${server}/profile/${user.zwiftId}/results`;

      await this.serviceMessage.create({
        recipientUser: team.creator,
        type: this.type,
        text,
        url,
        title,
      });

      return { data: null, message: 'Создано сервисное сообщение' };
    } catch (error) {
      handleAndLogError(error);
      return { data: null, message: 'Ошибка при создании сервисного сообщения' };
    }
  }

  /**
   * Сервисное сообщение об исключены вас из команды.
   * @returns
   */
  async youWereKicked({
    userId,
    teamId,
  }: {
    userId: string;
    teamId: string;
  }): Promise<{ data: null; message: string }> {
    try {
      const [user, team] = await Promise.all([this.getUser(userId), this.getTeam(teamId)]);

      const { text, title } = teamMessageTemplates.youWereKicked({
        memberName: user.name,
        teamName: team.name,
      });

      // Страница команды, из которой исключили userId.
      const url = `${server}/teams/${team.urlSlug}/members`;

      await this.serviceMessage.create({
        recipientUser: userId,
        initiatorUser: team.creator,
        type: this.type,
        text,
        url,
        title,
      });

      return { data: null, message: 'Создано сервисное сообщение' };
    } catch (error) {
      handleAndLogError(error);
      return { data: null, message: 'Ошибка при создании сервисного сообщения' };
    }
  }

  /**
   * Сервисные сообщения для всех участников о новом участнике.
   * @returns
   */
  async newMemberJoined({
    candidateId,
    teamId,
  }: {
    candidateId: string;
    teamId: string;
  }): Promise<{ data: null; message: string }> {
    try {
      const [user, team] = await Promise.all([this.getUser(candidateId), this.getTeam(teamId)]);

      const { text, title } = teamMessageTemplates.newMemberJoined({
        memberName: user.name,
        teamName: team.name,
      });

      // Страница пользователя, вступившего в команду.
      const url = `${server}/profile/${user.zwiftId}/results`;

      const teamMembersDB = await TeamMemberModel.find(
        { team: teamId },
        { _id: false, user: true }
      ).lean();

      // Создаем список всех участников команды, за исключением нового участника userId
      const teamMembers = teamMembersDB
        .map((m) => m.user.toString())
        .filter((m) => m !== candidateId);

      await this.serviceMessage.createMany(
        teamMembers.map((memberId) => ({
          recipientUser: memberId,
          initiatorUser: team.creator,
          type: this.type,
          text,
          url,
          title,
        }))
      );

      return { data: null, message: 'Создано сервисное сообщение' };
    } catch (error) {
      handleAndLogError(error);
      return { data: null, message: 'Ошибка при создании сервисного сообщения' };
    }
  }

  private async getUser(userId: string): Promise<{ name: string; zwiftId: number }> {
    const userDB = await User.findById(userId, {
      zwiftId: true,
      _id: false,
    }).lean<{ zwiftId: number }>();

    if (!userDB) {
      throw new Error(`Не найден пользователь с _id: "${userId}"`);
    }

    const riderDB = await Rider.findOne(
      { zwiftId: userDB.zwiftId },
      {
        firstName: true,
        lastName: true,
        _id: false,
      }
    ).lean<{ lastName: string; firstName: string }>();

    if (!riderDB) {
      throw new Error(`Не найден райдер с zwiftId: "${userDB.zwiftId}"`);
    }

    return { name: `${riderDB.firstName} ${riderDB.lastName}`, zwiftId: userDB.zwiftId };
  }

  private async getTeam(
    teamId: string
  ): Promise<{ _id: string; name: string; creator: string; urlSlug: string }> {
    const teamDB = await TeamModel.findById(teamId, {
      name: true,
      creator: true,
      urlSlug: true,
    }).lean<{ _id: Types.ObjectId; creator: Types.ObjectId; name: string; urlSlug: string }>();

    if (!teamDB) {
      throw new Error(`Не найдена команда с _id: "${teamId}"`);
    }

    return {
      _id: teamDB._id.toString(),
      name: teamDB.name,
      creator: teamDB.creator.toString(),
      urlSlug: teamDB.urlSlug,
    };
  }
}
