import { Request, Response } from 'express';

import { handleErrorInController } from '../errors/error.js';
import { TeamService } from '../service/Team.js';

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

  // /**
  //  * Создание команды.
  //  * @param {Request} req - Запрос Express.
  //  * @param {Response} res - Ответ Express.
  //  * @returns {Promise<Response>} JSON-ответ с сериями.
  //  */
  // public post = async (req: Request, res: Response): Promise<Response | void> => {
  //   try {
  //     const userId = req.user?.id;

  //     const team = req.body.team;

  //     // Вызов сервиса.
  //     const response = await this.teamService.create();

  //     // Возврат успешного ответа.
  //     return res.status(200).json(response);
  //   } catch (error) {
  //     handleErrorInController(res, error);
  //   }
  // };
}
