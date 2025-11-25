import { Request, Response } from 'express';

import { handleErrorInController } from '../errors/error.js';
import { AssetsService } from '../service/Assets.js';
import { RaceRouteIdsZSchema } from '../utils/deserialization/raceRoutes.js';

// types

/**
 * Контроллер с текстовыми библиотеками.
 */
export class AssetsController {
  private assetsService: AssetsService = new AssetsService();

  public get = async (req: Request, res: Response): Promise<Response | void> => {
    try {
      const result = RaceRouteIdsZSchema.safeParse(req.query.ids);

      if (!result.success) {
        const { fieldErrors, formErrors } = result.error.flatten();

        return res.status(400).json({
          message: 'Ошибка валидации',
          errors: { ...fieldErrors, formErrors },
        });
      }

      // Вызов сервиса.
      const response = await this.assetsService.getRoutes(result.data);

      return res.status(200).json(response);
    } catch (error) {
      handleErrorInController(res, error);
    }
  };
}
