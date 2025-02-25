import { Request, Response } from 'express';

import { handleErrorInController } from '../errors/error.js';

// types

import { SeriesPublicService } from '../service/series/series-public.js';

/**
 * Контроллер работы с сущностью "Серия заездов"для публичных запросов.
 */
export class SeriesPublicController {
  seriesPublicService: SeriesPublicService;

  constructor() {
    this.seriesPublicService = new SeriesPublicService();
  }

  /**
   * Получает список всех серий заездов.
   * @param {Request} req - Запрос Express.
   * @param {Response} res - Ответ Express.
   * @returns {Promise<Response>} JSON-ответ с сериями.
   */
  public getAll = async (req: Request, res: Response): Promise<Response | void> => {
    try {
      // Вызов сервиса.
      const response = await this.seriesPublicService.getAll();

      // Возврат успешного ответа.
      return res.status(200).json(response);
    } catch (error) {
      handleErrorInController(res, error);
    }
  };

  /**
   * Получает данные запрашиваемой urlSlug Серии заездов.
   * @param {Request} req - Запрос Express.
   * @param {Response} res - Ответ Express.
   * @returns {Promise<Response>} JSON-ответ с сериями.
   */
  public get = async (req: Request, res: Response): Promise<Response | void> => {
    try {
      const { urlSlug } = req.params;

      if (!urlSlug || urlSlug === 'undefined') {
        res.status(404);
      }
      // Вызов сервиса.
      const response = await this.seriesPublicService.get(urlSlug);

      // Возврат успешного ответа.
      return res.status(200).json(response);
    } catch (error) {
      handleErrorInController(res, error);
    }
  };
}
