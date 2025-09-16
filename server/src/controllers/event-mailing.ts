import { Request, Response } from 'express';

import { handleErrorInController } from '../errors/error.js';
import { getEventsForMailingPreviewService } from '../service/race/event_mailings/event-mailings.js';

/**
 * Контроллер работы с сущностью "Команда".
 */
export class EventEmailingTeamController {
  constructor() {}

  /**
   * Получает данные команды.
   */
  public get = async (req: Request, res: Response): Promise<Response | void> => {
    try {
      const period = req.params.period as 'week' | 'month';
      console.log({ period });

      if (!period || !['week', 'month'].includes(period)) {
        return res.status(400).json({ message: 'В запросе не получен period!' });
      }

      // Вызов сервиса.
      const response = await getEventsForMailingPreviewService(period);

      // Возврат успешного ответа.
      return res.status(200).json(response);
    } catch (error) {
      handleErrorInController(res, error);
    }
  };
}
