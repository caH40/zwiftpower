import { getAllServiceMessageForUserDto } from '../../dto/service-message.js';
import { handleAndLogError } from '../../errors/error.js';
import { ServiceMessageModel } from '../../Model/ServiceMessage.js';

// types
import { TGetAllServiceMessagesForUserDto } from '../../types/dto.interface.js';
import { TServiceMessage } from '../../types/model.interface.js';
import { TCreateMethodServiceMessageParams } from '../../types/types.interface.js';

/**
 * Класс сервисные сообщения на сайте.
 */
export class ServiceMessage {
  /**
   * Все сообщения для пользователя.

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

    return { data: messagesAfterDto, message: 'Сервисные сообщения' };
  }

  /**
   * Создание сервисного сообщения.
   * Формируется после успешных/неуспешных выполнений сервисов для которых необходимо
   * формировать сервисные сообщения для информирования пользователей.
   */
  async create(params: TCreateMethodServiceMessageParams): Promise<void> {
    try {
      await ServiceMessageModel.create(params);
    } catch (error) {
      handleAndLogError(error);
    }
  }
}
