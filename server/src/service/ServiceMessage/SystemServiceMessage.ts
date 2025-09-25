import { server } from '../../config/environment.js';
import { handleAndLogError } from '../../errors/error.js';
import { MessageDataProvider } from './MessageDataProvider.js';

// types
import {
  TCreateMethodServiceMessageParams,
  TServiceMessageType,
} from '../../types/service-message.types.js';
import { systemMessageTemplates } from '../../assets/service_message/system.js';

interface IServiceMessage {
  create(params: TCreateMethodServiceMessageParams): Promise<void>;
  createMany(params: TCreateMethodServiceMessageParams[]): Promise<void>;
}

/**
 * Класс системные сервисные сообщения на сайте.
 */
export class SystemServiceMessage {
  private serviceMessage: IServiceMessage;
  private readonly type: TServiceMessageType;
  private dataProvider: MessageDataProvider;

  constructor(serviceMessage: IServiceMessage) {
    this.serviceMessage = serviceMessage;
    this.dataProvider = new MessageDataProvider();
    this.type = 'system';
  }

  async newTeamCreated({
    creatorId,
    teamId,
  }: {
    creatorId: string;
    teamId: string;
  }): Promise<{ data: null; message: string }> {
    try {
      const [user, team, adminIds] = await Promise.all([
        this.dataProvider.getUser(creatorId),
        this.dataProvider.getTeam(teamId),
        this.dataProvider.getAdminIds(),
      ]);

      const url = `${server}/teams/${team.urlSlug}/members`;

      const { text, title } = systemMessageTemplates.newTeamCreated({
        creatorName: user.name,
        teamName: team.name,
      });

      await this.serviceMessage.createMany(
        adminIds.map((adminId) => ({
          recipientUser: adminId,
          initiatorUser: creatorId,
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

  async youWereCreatedNewTeam({
    creatorId,
    teamId,
  }: {
    creatorId: string;
    teamId: string;
  }): Promise<{ data: null; message: string }> {
    try {
      const team = await this.dataProvider.getTeam(teamId);

      const url = `${server}/teams/${team.urlSlug}/members`;

      const { text, title } = systemMessageTemplates.youWereCreatedNewTeam({
        teamName: team.name,
      });

      await this.serviceMessage.create({
        recipientUser: creatorId,
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
}
