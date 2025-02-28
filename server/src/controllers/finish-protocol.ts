import { Request, Response } from 'express';
import { FinishProtocol } from '../service/admin/finish-protocols.js';
import { handleErrorInController } from '../errors/error.js';

/**
 * Класс для контроллеров работы с именами (объектами) конфигураций финишного протокола.
 */
export class FinishProtocolController {
  finishProtocol: FinishProtocol;

  constructor() {
    this.finishProtocol = new FinishProtocol();
  }

  /**
   * Обрабатывает POST-запрос для создания конфигурации финишного протокола.
   * @param {Request} req - Запрос Express.
   * @param {Response} res - Ответ Express.
   * @returns {Promise<Response>} JSON-ответ с результатом операции.
   */
  public post = async (req: Request, res: Response): Promise<Response | void> => {
    try {
      // Проверка параметров из тела запроса
      this.validateBodyParamsMethodPost(req.body);

      // Извлечение параметров из тела запроса.
      const { organizer, name, description, isDefault, displayName } = req.body;

      // Вызов сервиса.
      const response = await this.finishProtocol.post({
        organizer,
        name,
        displayName,
        description,
        isDefault,
      });

      // Возврат успешного ответа.
      return res.status(200).json(response);
    } catch (error) {
      handleErrorInController(res, error);
    }
  };

  /**
   * Приватный метод для проверки параметров из тела запроса.
   * @param {Object} body - Тело запроса.
   * @param {string} body.organizer - _id организатора заездов.
   * @param {string} body.name - Название конфигурации финишного протокола.
   * @param {string} body.description - Описание конфигурации финишного протокола.
   * @param {boolean} body.isDefault - Конфигурация стандартная, может использоваться всеми Организаторами.
   * @throws Если параметры отсутствуют или невалидны.
   */
  private validateBodyParamsMethodPost(body: {
    organizer: string;
    name: string;
    displayName: string;
    description: string;
    isDefault: boolean;
  }): void {
    const { organizer, name, displayName, description, isDefault } = body;

    // Проверка наличия обязательных параметров
    if (!organizer || typeof organizer !== 'string') {
      throw new Error('Параметр organizer отсутствует или не является строкой');
    }

    if (!name || typeof name !== 'string') {
      throw new Error('Параметр name отсутствует или не является строкой');
    }

    if (!displayName || typeof displayName !== 'string') {
      throw new Error('Параметр displayName отсутствует или не является строкой');
    }

    if (!description || typeof description !== 'string') {
      throw new Error('Параметр description отсутствует или не является строкой');
    }

    if (typeof isDefault !== 'boolean') {
      throw new Error('Параметр isDefault должен быть булевым, если он передан');
    }
  }
}
