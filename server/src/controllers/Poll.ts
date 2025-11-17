import { Request, Response } from 'express';

import { handleErrorInController } from '../errors/error.js';
import {
  PollAnswersZSchema,
  PollIdZSchema,
  PollZSchema,
} from '../utils/deserialization/poll.js';
import { PollService } from '../service/PollService.js';

/**
 * Контроллер работы с сущностью "Команда".
 */
export class PollController {
  private teamService: PollService = new PollService();

  constructor() {}

  /**
   * Запрос голосования по _id.
   */
  public get = async (req: Request, res: Response): Promise<Response | void> => {
    try {
      const userId = req.user?.id;
      const result = PollIdZSchema.safeParse(req.params);

      if (!result.success) {
        const { fieldErrors, formErrors } = result.error.flatten();

        return res.status(400).json({
          message: 'Ошибка валидации',
          errors: { ...fieldErrors, formErrors },
        });
      }

      // Вызов сервиса.
      const response = await this.teamService.getById(result.data, userId);

      // Возврат успешного ответа.
      return res.status(200).json(response);
    } catch (error) {
      handleErrorInController(res, error);
    }
  };

  /**
   * Создание голосования.
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

  /**
   * Создание данных как проголосовал пользователь.
   */
  public postAnswers = async (req: Request, res: Response): Promise<Response | void> => {
    try {
      const userId = req.user?.id;

      const result = PollAnswersZSchema.safeParse({ ...req.body, userId });

      if (!result.success) {
        const { fieldErrors, formErrors } = result.error.flatten();

        return res.status(400).json({
          message: 'Ошибка валидации',
          errors: { ...fieldErrors, formErrors },
        });
      }

      // Вызов сервиса.
      const response = await this.teamService.createUserPollAnswers(result.data);

      // Возврат успешного ответа.
      return res.status(200).json(response);
    } catch (error) {
      handleErrorInController(res, error);
    }
  };
}
