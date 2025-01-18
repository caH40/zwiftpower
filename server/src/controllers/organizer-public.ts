import { Request, Response } from 'express';

import { handleErrorInController } from '../errors/error.js';

import {
  getOrganizerPublicService,
  getOrganizersPublicService,
} from '../service/organizer/organizer-public.js';

/**
 * Контроллер получения данных Организаторов заездов для публичной страницы.
 */
export async function getOrganizersPublic(req: Request, res: Response) {
  try {
    // Вызов сервиса.
    const response = await getOrganizersPublicService();

    // Возврат успешного ответа.
    return res.status(200).json(response);
  } catch (error) {
    handleErrorInController(res, error);
  }
}

/**
 * Контроллер получения данных Организатора заездов для публичной страницы.
 */
export async function getOrganizerPublic(req: Request, res: Response) {
  try {
    const { urlSlug } = req.params;

    // Проверка на наличие id запрашиваемого организатора заездов.
    if (!urlSlug || urlSlug === 'undefined') {
      throw new Error('Не получен id организатора');
    }

    // Вызов сервиса.
    const response = await getOrganizerPublicService({ urlSlug });

    // Возврат успешного ответа.
    return res.status(200).json(response);
  } catch (error) {
    handleErrorInController(res, error);
  }
}
