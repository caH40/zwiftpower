import { Request, Response } from 'express';
import { Types } from 'mongoose';

import { handleErrorInController } from '../errors/error.js';
import { SeriesService } from '../service/series/series.js';
import { Organizer } from '../Model/Organizer.js';
import { SeriesDataZSchema } from '../utils/deserialization/series-data.js';

// types
import { SeriesDataFromClientForCreate } from '../types/http.interface.js';

/**
 * Контроллер работы с сущностью "Серия заездов".
 */
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
  public getAll = async (req: Request, res: Response): Promise<Response | void> => {
    try {
      // id авторизованного пользователя, который делает запрос.
      const { userId } = req.params;

      // Проверка, что запрос происходит от Организатора.
      const organizerId = await this.checkOrganizer(userId);

      // Вызов сервиса.
      const response = await this.seriesService.getAll(organizerId);

      // Возврат успешного ответа.
      return res.status(200).json(response);
    } catch (error) {
      handleErrorInController(res, error);
    }
  };

  // Получение запрашиваемой серии заездов.
  public async get() {}

  /**
   * Создание серии заездов.
   * @param {Request} req - Запрос Express.
   * @param {Response} res - Ответ Express.
   * @returns {Promise<Response>} JSON-ответ с сериями.
   */
  public post = async (req: Request, res: Response): Promise<Response | void> => {
    try {
      // id авторизованного пользователя, который делает запрос.
      const { userId } = req.params;

      // Проверка, что запрос происходит от Организатора.
      const organizerId = await this.checkOrganizer(userId);

      // Получение файлов изображений, если они есть.
      const files = req.files as { [fieldname: string]: Express.Multer.File[] };
      const logoFile = files?.logoFile?.[0];
      const posterFile = files?.posterFile?.[0];

      // Десериализация данных из тела запроса.
      const deserializedSeriesData = SeriesDataZSchema.parse(
        req.body
      ) as SeriesDataFromClientForCreate;

      // Вызов сервиса.
      const response = await this.seriesService.post({
        ...deserializedSeriesData,
        organizerId,
        logoFile,
        posterFile,
      });

      // Возврат успешного ответа
      res.status(201).json(response);
    } catch (error) {
      handleErrorInController(res, error);
    }
  };

  // Обновление данных серии заездов.
  // public put = async (req: Request, res: Response): Promise<Response | void> => {};

  /**
   * Удаление серии заездов.
   * @param {Request} req - Запрос Express.
   * @param {Response} res - Ответ Express.
   * @returns {Promise<Response>} JSON-ответ с сериями.
   */
  public delete = async (req: Request, res: Response): Promise<Response | void> => {
    try {
      // id авторизованного пользователя, который делает запрос.
      const { userId } = req.params;

      // Проверка, что запрос происходит от Организатора.
      await this.checkOrganizer(userId);

      const { seriesId } = req.body;

      if (!seriesId) {
        throw new Error('Не получен seriesId для удалении Серии заездов!');
      }

      // Вызов сервиса.
      const response = await this.seriesService.delete({ seriesId });

      // Возврат успешного ответа.
      return res.status(200).json(response);
    } catch (error) {
      handleErrorInController(res, error);
    }
  };

  /**
   * Проверка, что запрос происходит от Организатора.
   */
  public async checkOrganizer(userId: string): Promise<Types.ObjectId> {
    // Проверка, что запрос происходит от Организатора.
    const organizerDB = await Organizer.findOne({ creator: userId }, { _id: true }).lean<{
      _id: Types.ObjectId;
    }>();

    if (!organizerDB) {
      throw new Error('Вы не являетесь организатором заездов!');
    }

    return organizerDB._id;
  }
}
