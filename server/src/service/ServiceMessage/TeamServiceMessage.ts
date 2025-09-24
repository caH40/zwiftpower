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

interface IServiceMessage {
  create(params: TCreateMethodServiceMessageParams): Promise<void>;
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
      const [applicantName, team] = await Promise.all([
        this.getUserName(candidateId),
        this.getTeam(teamId),
      ]);

      const url = `${server}/teams/${team.urlSlug}/control/members`;
      const { text, title } = teamMessageTemplates.joinRequest({
        applicantName,
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
   * @param candidateId - id пользователя которому одобрили заявку и которому предназначается сообщение
   * @param teamId
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

      await this.serviceMessage.create({
        recipientUser: candidateId,
        initiatorUser: team.creator,
        type: this.type,
        text,
        title,
      });

      return { data: null, message: 'Создано сервисное сообщение' };
    } catch (error) {
      handleAndLogError(error);
      return { data: null, message: 'Ошибка при создании сервисного сообщения' };
    }
  }

  private async getUserName(userId: string): Promise<string> {
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

    return `${riderDB.firstName} ${riderDB.lastName}`;
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
