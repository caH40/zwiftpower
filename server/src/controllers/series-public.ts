import { Request, Response } from 'express';

import { handleErrorInController } from '../errors/error.js';

// types

import { SeriesPublicService } from '../service/series/series-public.js';
import { TEventStatus } from '../types/types.interface.js';

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
      // Если передан organizerSlug, значит запрос только по сериям запрашиваемого организатора.
      const organizerSlug = req.params.organizerSlug;
      // Вызов сервиса.
      const response = await this.seriesPublicService.getAll(organizerSlug);

      // Возврат успешного ответа.
      return res.status(200).json(response);
    } catch (error) {
      handleErrorInController(res, error);
    }
  };

  /**
   * Получает данные Серии заездов по urlSlug.
   * @param {Request} req - Запрос Express.
   * @param {Response} res - Ответ Express.
   * @returns {Promise<Response>} JSON-ответ с сериями.
   */
  public get = async (req: Request, res: Response): Promise<Response | void> => {
    try {
      const { urlSlug } = req.params;

      if (!urlSlug || urlSlug === 'undefined') {
        return res.status(404);
      }
      // Вызов сервиса.
      const response = await this.seriesPublicService.get(urlSlug);

      // Возврат успешного ответа.
      return res.status(200).json(response);
    } catch (error) {
      handleErrorInController(res, error);
    }
  };

  /**
   * Получает данные Серии заездов по urlSlug.
   * @param {Request} req - Запрос Express.
   * @param {Response} res - Ответ Express.
   * @returns {Promise<Response>} JSON-ответ с сериями.
   */
  public getStages = async (req: Request, res: Response): Promise<Response | void> => {
    try {
      const { urlSlug, status } = req.params as {
        urlSlug: string | undefined | 'undefined';
        status: TEventStatus | undefined | 'undefined';
      };

      if (!urlSlug || urlSlug === 'undefined' || !status || status === 'undefined') {
        throw new Error('Не получены валидные данные по urlSlug или status');
      }

      // Вызов сервиса.
      const response = await this.seriesPublicService.getStages({ urlSlug, status });

      // Возврат успешного ответа.
      return res.status(200).json(response);
    } catch (error) {
      handleErrorInController(res, error);
    }
  };

  /**
   * Получение результатов этапа серии заездов.
   *
   */
  public getResults = async (req: Request, res: Response) => {
    try {
      const { urlSlug, stageOrder } = req.params;

      if (!urlSlug || urlSlug === 'undefined' || !stageOrder || stageOrder === 'undefined') {
        res.status(404);
      }

      // Вызов сервиса.
      const response = await this.seriesPublicService.getStageResults({
        urlSlug,
        stageOrder: +stageOrder,
      });

      // Возврат успешного ответа.
      return res.status(200).json(response);
    } catch (error) {
      handleErrorInController(res, error);
    }
  };
}
