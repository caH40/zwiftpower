import { Request, Response } from 'express';

import { handleErrorInController } from '../errors/error.js';
import { PollZSchema } from '../utils/deserialization/poll.js';
import { PollService } from '../service/PollService.js';

/**
 * Контроллер работы с сущностью "Команда".
 */
export class PollController {
  private teamService: PollService = new PollService();

  constructor() {}

  /**
   * Создание команды.
   */
  public post = async (req: Request, res: Response): Promise<Response | void> => {
    try {
      const userId = req.user?.id;

      const result = PollZSchema.safeParse({ ...req.body, creator: userId });

      if (!result.success) {
        const { fieldErrors, formErrors } = result.error.flatten();

        return res.status(400).json({
          message: 'Ошибка валидации',
          errors: { ...fieldErrors, formErrors },
        });
      }

      // Вызов сервиса.
      const response = await this.teamService.create(result.data);

      // Возврат успешного ответа.
      return res.status(200).json(response);
    } catch (error) {
      handleErrorInController(res, error);
    }
  };
}
