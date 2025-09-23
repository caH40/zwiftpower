import { getAllServiceMessageForUserDto } from '../dto/service-message.js';
import { ServiceMessageModel } from '../Model/ServiceMessage.js';

// types
import { TGetAllServiceMessagesForUserDto } from '../types/dto.interface.js';
import { TServiceMessage } from '../types/model.interface.js';

/**
 * Класс сервисные сообщения на сайте.
 */
export class ServiceMessage {
  /**
   * Все сообщения для пользователя.
   *
   * Возвращает массив объектов с тексом сообщения и возможной ссылкой на сущность источника сообщения.
   */
  async getAll(
    userId: string
  ): Promise<{ data: TGetAllServiceMessagesForUserDto[]; message: string }> {
    const messagesDB = await ServiceMessageModel.find({
      recipientUser: userId,
      isRead: false,
    })
      .sort({ createdAt: -1 })
      .lean<TServiceMessage[]>();

    const messagesAfterDto = messagesDB.map((m) => getAllServiceMessageForUserDto(m));

    return { data: messagesAfterDto, message: `Сервисные сообщения для пользователя user` };
  }

  // private renderServiceMessage({
  //   type,
  //   templateKey,
  //   metadata,
  // }: {
  //   type: TServiceMessageType;
  //   templateKey: string;
  //   metadata?: Partial<Record<TMessageTemplateMetadataKey, string>>;
  // }): string {
  //   const template = serviceMessageTemplates[type]?.[templateKey];

  //   if (!template) {
  //     return 'Нет сообщения';
  //   }

  //   return template.replace(/{{(\w+)}}/g, (_, key) =>
  //     metadata ? metadata[key as TMessageTemplateMetadataKey] ?? '' : ''
  //   );
  // }
}
