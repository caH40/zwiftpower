import { Request, Response } from 'express';

import { handleErrorInController } from '../errors/error.js';
import { AssetsService } from '../service/Assets.js';

// types

/**
 * Контроллер с текстовыми библиотеками.
 */
export class AssetsController {
  private assetsService: AssetsService = new AssetsService();

  public get = async (req: Request, res: Response): Promise<Response | void> => {
    try {
      const idFromParams = req.params.id;

      const id = +idFromParams;

      if (!id || isNaN(id)) {
        throw new Error('Не получен routeId');
      }
      // Вызов сервиса.
      const response = await this.assetsService.getRoute(id);

      return res.status(200).json(response);
    } catch (error) {
      handleErrorInController(res, error);
    }
  };
}
