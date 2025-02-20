import { Request, Response } from 'express';

import { handleErrorInController } from '../errors/error.js';
import { SeriesService } from '../service/series/series.js';

export class SeriesController {
  seriesService: SeriesService;

  constructor() {
    this.seriesService = new SeriesService();
  }

  /**
   * Получает список всех серий заездов.
   * @param {Request} req - Запрос Express.
   * @param {Response} res - Ответ Express.
   * @returns {Promise<Response>} JSON-ответ с сериями.
   */
  public async getAll(req: Request, res: Response): Promise<Response | void> {
    try {
      // Вызов сервиса.
      const response = await this.seriesService.getAll();

      // Возврат успешного ответа.
      return res.status(200).json(response);
    } catch (error) {
      handleErrorInController(res, error);
    }
  }

  // Получение запрашиваемой серии заездов.
  public async get() {}

  // Создание серии заездов.
  public async post() {}

  // Обновление данных серии заездов.
  public async put() {}
}
