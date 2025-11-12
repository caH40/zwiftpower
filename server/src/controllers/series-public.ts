import { Request, Response } from 'express';

import { handleErrorInController } from '../errors/error.js';

// types

import { PublicSeriesService } from '../service/series/PublicSeries.js';
import { TEventStatus } from '../types/types.interface.js';
import { PublicSeriesGCService } from '../service/series/PublicSeriesGC.js';
import { SeriesZSchema } from '../utils/deserialization/series/all.js';

/**
 * Контроллер работы с сущностью "Серия заездов"для публичных запросов.
 */
export class SeriesPublicController {
  private publicSeriesService: PublicSeriesService;
  private publicSeriesGCService: PublicSeriesGCService = new PublicSeriesGCService();

  constructor() {
    this.publicSeriesService = new PublicSeriesService();
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
      const seriesStatus = req.query.seriesStatus;

      const result = SeriesZSchema.safeParse({ organizerSlug, seriesStatus });

      if (!result.success) {
        return res.status(400).json({ message: result.error.format()._errors.join(', ') });
      }

      // Вызов сервиса.
      const response = await this.publicSeriesService.getAll(result.data);

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
      const response = await this.publicSeriesService.get(urlSlug);

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
      const response = await this.publicSeriesGCService.getStages({ urlSlug, status });

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
        throw new Error('Не получены валидные данные по urlSlug или stageOrder');
      }

      // Вызов сервиса.
      const response = await this.publicSeriesGCService.getStageResults({
        urlSlug,
        stageOrder: +stageOrder,
      });

      // Возврат успешного ответа.
      return res.status(200).json(response);
    } catch (error) {
      handleErrorInController(res, error);
    }
  };

  /**
   * Получение генеральной классификации серии заездов.
   */
  public getGeneralClassification = async (req: Request, res: Response) => {
    try {
      const { urlSlug } = req.params;

      if (!urlSlug || urlSlug === 'undefined') {
        throw new Error('Не получены валидные данные по urlSlug');
      }

      // Вызов сервиса.
      const response = await this.publicSeriesGCService.getGeneralClassification(urlSlug);

      // Возврат успешного ответа.
      return res.status(200).json(response);
    } catch (error) {
      handleErrorInController(res, error);
    }
  };
}
