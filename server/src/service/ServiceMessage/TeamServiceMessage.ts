import { MessageDataProvider } from './MessageDataProvider.js';
import { TeamMemberModel } from '../../Model/TeamMember.js';
import { teamMessageTemplates } from '../../assets/service_message/team.js';
import { handleAndLogError } from '../../errors/error.js';
import { wsConnections } from '../../zp-server.js';
import { ServiceMessageDispatcher } from '../websocket/ServiceMessageDispatcher.js';

// types
import {
  TCreateMethodServiceMessageParams,
  TServiceMessageType,
} from '../../types/service-message.types.js';

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
  private dataProvider: MessageDataProvider;

  constructor(serviceMessage: IServiceMessage) {
    this.serviceMessage = serviceMessage;
    this.dataProvider = new MessageDataProvider();
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
      const [user, team] = await Promise.all([
        this.dataProvider.getUser(candidateId),
        this.dataProvider.getTeam(teamId),
      ]);

      const entityUrl = `/teams/${team.urlSlug}/control/members`;
      const entityLogo = team.logoUrl;

      const { text, title } = teamMessageTemplates.joinRequest({
        applicantName: user.name,
        teamName: team.name,
      });

      const recipientUser = team.creator;

      await this.serviceMessage.create({
        recipientUser,
        initiatorUser: candidateId,
        type: this.type,
        text,
        entityUrl,
        entityLogo,
        title,
      });

      await this.notifyUser(recipientUser);

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
      const team = await this.dataProvider.getTeam(teamId);

      const entityUrl = `/teams/${team.urlSlug}/members`;
      const entityLogo = team.logoUrl;

      const { text, title } = teamMessageTemplates.requestApproved({
        teamName: team.name,
      });

      const recipientUser = candidateId;

      await this.serviceMessage.create({
        recipientUser,
        initiatorUser: team.creator,
        type: this.type,
        text,
        entityUrl,
        entityLogo,
        title,
      });

      await this.notifyUser(recipientUser);

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
      const team = await this.dataProvider.getTeam(teamId);

      const { text, title } = teamMessageTemplates.requestRejected({
        teamName: team.name,
      });

      const entityUrl = `/teams/${team.urlSlug}/members`;
      const entityLogo = team.logoUrl;

      const recipientUser = candidateId;

      await this.serviceMessage.create({
        recipientUser,
        initiatorUser: team.creator,
        type: this.type,
        text,
        entityUrl,
        entityLogo,
        title,
      });

      await this.notifyUser(recipientUser);

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
        this.dataProvider.getUser(teamMemberId),
        this.dataProvider.getTeam(teamId),
      ]);

      const { text, title } = teamMessageTemplates.memberLeft({
        memberName: user.name,
        teamName: team.name,
      });

      // Страница пользователя, который вышел из состава из команды.
      const entityUrl = `/profile/${user.zwiftId}/results`;
      const entityLogo = user.imageSrc;

      const recipientUser = team.creator;

      await this.serviceMessage.create({
        recipientUser,
        initiatorUser: teamMemberId,
        type: this.type,
        text,
        entityUrl,
        entityLogo,
        title,
      });

      await this.notifyUser(recipientUser);

      return { data: null, message: 'Создано сервисное сообщение' };
    } catch (error) {
      handleAndLogError(error);
      return { data: null, message: 'Ошибка при создании сервисного сообщения' };
    }
  }

  /**
   * Сервисное сообщение о вашем выходе из из команды.
   * @returns
   */
  async youLeftTeam({
    teamMemberId,
    teamId,
  }: {
    teamMemberId: string;
    teamId: string;
  }): Promise<{ data: null; message: string }> {
    try {
      const team = await this.dataProvider.getTeam(teamId);

      const { text, title } = teamMessageTemplates.youLeftTeam({
        teamName: team.name,
      });

      // Страница команды из которой вышел пользователь.
      const entityUrl = `/teams/${team.urlSlug}/members`;
      const entityLogo = team.logoUrl;

      const recipientUser = teamMemberId;

      await this.serviceMessage.create({
        recipientUser,
        type: this.type,
        text,
        entityUrl,
        entityLogo,
        title,
      });

      await this.notifyUser(recipientUser);

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
      const [user, team] = await Promise.all([
        this.dataProvider.getUser(userId),
        this.dataProvider.getTeam(teamId),
      ]);

      const { text, title } = teamMessageTemplates.youKickedMember({
        memberName: user.name,
        teamName: team.name,
      });

      // Страница пользователя, исключенного из команды.
      const entityUrl = `/profile/${user.zwiftId}/results`;
      const entityLogo = user.imageSrc;

      const recipientUser = team.creator;

      await this.serviceMessage.create({
        recipientUser,
        type: this.type,
        text,
        entityUrl,
        entityLogo,
        title,
      });

      await this.notifyUser(recipientUser);

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
      const team = await this.dataProvider.getTeam(teamId);

      const { text, title } = teamMessageTemplates.youWereKicked({
        teamName: team.name,
      });

      // Страница команды, из которой исключили userId.
      const entityUrl = `/teams/${team.urlSlug}/members`;
      const entityLogo = team.logoUrl;

      const recipientUser = userId;

      await this.serviceMessage.create({
        recipientUser,
        initiatorUser: team.creator,
        type: this.type,
        text,
        entityUrl,
        entityLogo,
        title,
      });

      await this.notifyUser(recipientUser);

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
      const [user, team] = await Promise.all([
        this.dataProvider.getUser(candidateId),
        this.dataProvider.getTeam(teamId),
      ]);

      const { text, title } = teamMessageTemplates.newMemberJoined({
        memberName: user.name,
        teamName: team.name,
      });

      // Страница пользователя, вступившего в команду.
      const entityUrl = `/profile/${user.zwiftId}/results`;
      const entityLogo = user.imageSrc;

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
          entityUrl,
          entityLogo,
          title,
        }))
      );

      await this.notifyUsers(teamMembers);

      return { data: null, message: 'Создано сервисное сообщение' };
    } catch (error) {
      handleAndLogError(error);
      return { data: null, message: 'Ошибка при создании сервисного сообщения' };
    }
  }

  /**
   * Сервисное сообщение о блокировке участника для команды.
   * @returns
   */
  async youBannedMember({
    userId,
    teamId,
  }: {
    userId: string;
    teamId: string;
  }): Promise<{ data: null; message: string }> {
    try {
      const [user, team] = await Promise.all([
        this.dataProvider.getUser(userId),
        this.dataProvider.getTeam(teamId),
      ]);

      const { text, title } = teamMessageTemplates.youBannedMember({
        memberName: user.name,
        teamName: team.name,
      });

      // Страница пользователя, исключенного из команды.
      const entityUrl = `/profile/${user.zwiftId}/results`;
      const entityLogo = user.imageSrc;

      const recipientUser = team.creator;

      await this.serviceMessage.create({
        recipientUser,
        type: this.type,
        text,
        entityUrl,
        entityLogo,
        title,
      });

      await this.notifyUser(recipientUser);

      return { data: null, message: 'Создано сервисное сообщение' };
    } catch (error) {
      handleAndLogError(error);
      return { data: null, message: 'Ошибка при создании сервисного сообщения' };
    }
  }

  /**
   * Сервисное сообщение о блокировке вас для команды.
   * @returns
   */
  async youWereBanned({
    userId,
    teamId,
  }: {
    userId: string;
    teamId: string;
  }): Promise<{ data: null; message: string }> {
    try {
      const team = await this.dataProvider.getTeam(teamId);

      const { text, title } = teamMessageTemplates.youWereBanned({
        teamName: team.name,
      });

      // Страница команды, из которой исключили userId.
      const entityUrl = `/teams/${team.urlSlug}/members`;
      const entityLogo = team.logoUrl;

      const recipientUser = userId;

      await this.serviceMessage.create({
        recipientUser,
        initiatorUser: team.creator,
        type: this.type,
        text,
        entityUrl,
        entityLogo,
        title,
      });

      await this.notifyUser(recipientUser);

      return { data: null, message: 'Создано сервисное сообщение' };
    } catch (error) {
      handleAndLogError(error);
      return { data: null, message: 'Ошибка при создании сервисного сообщения' };
    }
  }

  /**
   * Сервисное сообщение о блокировке вас для команды.
   * @returns
   */
  async youUnbannedMember({
    userId,
    teamId,
  }: {
    userId: string;
    teamId: string;
  }): Promise<{ data: null; message: string }> {
    try {
      const [user, team] = await Promise.all([
        this.dataProvider.getUser(userId),
        this.dataProvider.getTeam(teamId),
      ]);

      const { text, title } = teamMessageTemplates.youUnbannedMember({
        memberName: user.name,
        teamName: team.name,
      });

      // Страница пользователя с которого сняли блокировку для команды.
      const entityUrl = `/profile/${user.zwiftId}/results`;
      const entityLogo = user.imageSrc;

      const recipientUser = team.creator;

      await this.serviceMessage.create({
        recipientUser,
        type: this.type,
        text,
        entityUrl,
        entityLogo,
        title,
      });

      await this.notifyUser(recipientUser);

      return { data: null, message: 'Создано сервисное сообщение' };
    } catch (error) {
      handleAndLogError(error);
      return { data: null, message: 'Ошибка при создании сервисного сообщения' };
    }
  }

  /**
   * Сервисное сообщение о блокировке вас для команды.
   * @returns
   */
  async youWereUnbanned({
    userId,
    teamId,
  }: {
    userId: string;
    teamId: string;
  }): Promise<{ data: null; message: string }> {
    try {
      const team = await this.dataProvider.getTeam(teamId);

      const { text, title } = teamMessageTemplates.youWereUnbanned({
        teamName: team.name,
      });

      // Страница команды, из которой исключили userId.
      const entityUrl = `/teams/${team.urlSlug}/members`;
      const entityLogo = team.logoUrl;

      const recipientUser = userId;

      await this.serviceMessage.create({
        recipientUser: userId,
        initiatorUser: team.creator,
        type: this.type,
        text,
        entityUrl,
        entityLogo,
        title,
      });

      await this.notifyUser(recipientUser);

      return { data: null, message: 'Создано сервисное сообщение' };
    } catch (error) {
      handleAndLogError(error);
      return { data: null, message: 'Ошибка при создании сервисного сообщения' };
    }
  }

  /** Отправка обновленных данных сервисных сообщений пользователю recipientUser. */
  private async notifyUser(recipientUser: string): Promise<void> {
    const serviceMessageDispatcher = new ServiceMessageDispatcher(wsConnections);
    await serviceMessageDispatcher.notifyUser(recipientUser, 'notification');
  }

  /** Отправка обновленных данных сервисных сообщений пользователю recipientUser. */
  private async notifyUsers(recipientUsers: string[]): Promise<void> {
    const serviceMessageDispatcher = new ServiceMessageDispatcher(wsConnections);
    await serviceMessageDispatcher.notifyUsers(recipientUsers, 'notification');
  }
}
