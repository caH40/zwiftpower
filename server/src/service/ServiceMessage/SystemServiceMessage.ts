import { systemMessageTemplates } from '../../assets/service_message/system.js';
import { ServiceMessageDispatcher } from '../websocket/ServiceMessageDispatcher.js';
import { wsConnections } from '../../zp-server.js';
import { handleAndLogError } from '../../errors/error.js';
import { MessageDataProvider } from './MessageDataProvider.js';

// types
import {
  TCreateMethodServiceMessageParams,
  TServiceMessageType,
} from '../../types/service-message.types.js';
import { TYooKassaPaymentNotification } from '../../types/payment.types.js';

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

      const entityUrl = `/teams/${team.urlSlug}/members`;
      const entityLogo = team.logoUrl;

      const { text, title } = systemMessageTemplates.newTeamCreated({
        creatorName: user.name,
        teamName: team.name,
      });

      const recipientUsers = adminIds;

      await this.serviceMessage.createMany(
        recipientUsers.map((recipientUser) => ({
          recipientUser: recipientUser,
          initiatorUser: creatorId,
          type: this.type,
          text,
          entityUrl,
          entityLogo,
          title,
        }))
      );

      // Отправка обновленных данных сервисных сообщений пользователям recipientUsers.
      const serviceMessageDispatcher = new ServiceMessageDispatcher(wsConnections);
      await serviceMessageDispatcher.notifyUsers(recipientUsers, 'notification');

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
      const { urlSlug, name, logoUrl: entityLogo } = await this.dataProvider.getTeam(teamId);

      const entityUrl = `/teams/${urlSlug}/members`;

      const { text, title } = systemMessageTemplates.youWereCreatedNewTeam({
        teamName: name,
      });

      const recipientUser = creatorId;

      await this.serviceMessage.create({
        recipientUser,
        type: this.type,
        text,
        entityUrl,
        entityLogo,
        title,
      });

      // Отправка обновленных данных сервисных сообщений пользователю recipientUser.
      const serviceMessageDispatcher = new ServiceMessageDispatcher(wsConnections);
      await serviceMessageDispatcher.notifyUser(recipientUser, 'notification');

      return { data: null, message: 'Создано сервисное сообщение' };
    } catch (error) {
      handleAndLogError(error);
      return { data: null, message: 'Ошибка при создании сервисного сообщения' };
    }
  }

  /**
   * Создание и отправка сервисного сообщения по событию YooKassa.
   */
  async yooKassaNotification(
    notification: TYooKassaPaymentNotification
  ): Promise<{ data: null; message: string }> {
    try {
      const adminIds = await this.dataProvider.getAdminIds();

      const { description, status, amount } = notification.object;

      const title = 'Операции по ЮКассе';
      const text = `${description} Сумма: ${amount.value} ${amount.currency}. Статус: ${status}`;

      const externalEntityUrl = 'https://yookassa.ru/my/payments';
      const entityLogo = '/images/yookassa.png';

      const recipientUsers = adminIds;

      await this.serviceMessage.createMany(
        recipientUsers.map((recipientUser) => ({
          recipientUser: recipientUser,
          type: this.type,
          text,
          externalEntityUrl,
          entityLogo,
          title,
        }))
      );

      // Отправка обновленных данных сервисных сообщений пользователям recipientUsers.
      const serviceMessageDispatcher = new ServiceMessageDispatcher(wsConnections);
      await serviceMessageDispatcher.notifyUsers(recipientUsers, 'notification');

      return { data: null, message: 'Создано сервисное сообщение' };
    } catch (error) {
      handleAndLogError(error);
      return { data: null, message: 'Ошибка при создании сервисного сообщения' };
    }
  }
}
