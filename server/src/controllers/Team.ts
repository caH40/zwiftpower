import { Request, Response } from 'express';

import { handleErrorInController } from '../errors/error.js';
import { TeamService } from '../service/Team.js';
import { TeamZSchema } from '../utils/deserialization/team.js';

// types

/**
 * Контроллер работы с сущностью "Команда".
 */
export class TeamController {
  teamService: TeamService;

  constructor() {
    this.teamService = new TeamService();
  }

  /**
   * Получает данные команды.
   * @param {Request} req - Запрос Express.
   * @param {Response} res - Ответ Express.
   * @returns {Promise<Response>} JSON-ответ с сериями.
   */
  public get = async (req: Request, res: Response): Promise<Response | void> => {
    try {
      const urlSlug = req.params.urlSlug;

      if (!urlSlug) {
        return res.status(400).json({ message: 'В запросе не получен urlSlug команды!' });
      }

      // Вызов сервиса.
      const response = await this.teamService.get(urlSlug);

      // Возврат успешного ответа.
      return res.status(200).json(response);
    } catch (error) {
      handleErrorInController(res, error);
    }
  };

  /**
   * Получает список всех команд.
   * @param {Request} req - Запрос Express.
   * @param {Response} res - Ответ Express.
   * @returns {Promise<Response>} JSON-ответ с сериями.
   */
  public getAll = async (req: Request, res: Response): Promise<Response | void> => {
    try {
      // Вызов сервиса.
      const response = await this.teamService.getAll();

      // Возврат успешного ответа.
      return res.status(200).json(response);
    } catch (error) {
      handleErrorInController(res, error);
    }
  };

  /**
   * Создание команды.
   * @param {Request} req - Запрос Express.
   * @param {Response} res - Ответ Express.
   * @returns {Promise<Response>} JSON-ответ с сериями.
   */
  public post = async (req: Request, res: Response): Promise<Response | void> => {
    try {
      const userId = req.user?.id;

      if (!userId) {
        return res.status(400).json({ message: 'Не получен userId!' });
      }

      const result = TeamZSchema.safeParse(req.body);

      if (!result.success) {
        return res.status(400).json({ errors: result.error.format() });
      }

      const parsedTeamData = result.data;

      // Получение файлов изображений, если они есть.
      const files = req.files as { [fieldname: string]: Express.Multer.File[] };
      const logoFile = files?.logoFile?.[0];
      const posterFile = files?.posterFile?.[0];

      // Вызов сервиса.
      const response = await this.teamService.create({
        team: { ...parsedTeamData, creator: userId },
        logoFile,
        posterFile,
      });

      // Возврат успешного ответа.
      return res.status(200).json(response);
    } catch (error) {
      handleErrorInController(res, error);
    }
  };

  /**
   * Обработчик заявки на вступление.
   * @param {Request} req - Запрос Express.
   * @param {Response} res - Ответ Express.
   * @returns {Promise<Response>} JSON-ответ с сериями.
   */
  public handleJoinRequest = async (req: Request, res: Response): Promise<Response | void> => {
    try {
      const userId = req.user?.id;

      if (!userId) {
        return res.status(400).json({ message: 'Не получен userId!' });
      }

      const { urlSlug } = req.body;

      if (!urlSlug) {
        return res.status(400).json({ message: 'Не получен urlSlug команды!' });
      }

      // Вызов сервиса.
      const response = await this.teamService.handleJoinRequest({
        candidateId: userId,
        urlSlug,
      });

      // Возврат успешного ответа.
      return res.status(200).json(response);
    } catch (error) {
      handleErrorInController(res, error);
    }
  };

  /**
   * Контроллер получения списка пользователей, которые подали заявку на вступление в команду.
   * @param {Request} req - Запрос Express.
   * @param {Response} res - Ответ Express.
   * @returns {Promise<Response>} JSON-ответ с сериями.
   */
  public getPendingRiders = async (req: Request, res: Response): Promise<Response | void> => {
    try {
      const userId = req.user?.id;

      if (!userId) {
        return res.status(400).json({ message: 'Не получен userId!' });
      }

      // Вызов сервиса.
      const response = await this.teamService.getPendingRiders({
        teamCreatorId: userId,
      });

      // Возврат успешного ответа.
      return res.status(200).json(response);
    } catch (error) {
      handleErrorInController(res, error);
    }
  };
}
